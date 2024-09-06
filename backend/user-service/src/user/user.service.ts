import { ConflictException, HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultResponse } from 'src/common/interfaces/result.interface';
import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { In, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt'
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { InfoUserDto } from 'src/dto/info-user.dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>,private configService: ConfigService ,@Inject('PROFILE') private readonly profilesClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, Number(this.configService.get<string>('SALT')));
    return hashedPassword;
  }

  private extractDuplicateField(errorMessage: string): string {
    const match = errorMessage.match(/for key '([^']+)'/);
    // console.log(this.findKeyByValue(match[1]))
    const allConfig = {
      email: this.configService.get<string>('IDX_USERS_EMAIL'),
      phone: this.configService.get<string>('IDX_USERS_PHONE')
    }
   return match ? allConfig.email === match[1].replace('users.','')?'email':'phone' : 'dữ liệu'
  }
  
  checkIsEmail(data:string){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data);
  }

  checkIsPhoneNumber(data:string){
    const phoneRegex = /^\+?\d{10,15}$/; 
    return phoneRegex.test(data);
  }
  async createUser(registerDto:CreateUserDto): Promise<ResultResponse>{
    try{
      const id = uuidv4()
      const pass = await this.hashPassword(registerDto.password)
      const user =  this.userRepository.create({...registerDto,user_id:id,username:id,password:pass})
      await this.userRepository.save(user)
      await firstValueFrom(this.profilesClient.send({cmd:'create-profile'},id))
      return {
        statusCode:HttpStatus.CREATED,
        message: 'Tạo tài khoản thành công'

      }
    }catch(err){
      if (err.code === 'ER_DUP_ENTRY') {
        
        const errField = this.extractDuplicateField(err.sqlMessage);
        throw new ConflictException(`${errField} đã tồn tại.`)
      }
      
      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
      
    
  }

  async updateUser(user_id:string,updateDto:UpdateUserDto):Promise<User>{
    await this.userRepository.update(user_id,updateDto);
    return this.userRepository.findOne({where:{user_id: user_id}})
  }

  async findUser(username:string):Promise<User>{
    const data = await this.userRepository.findOne({where:[{username:username },{phone:username},{email:username}]})
    return data
  }

  async findOneInfo(user_id:string):Promise<InfoUserDto> {
    // console.log(user_id)
    const dataProfile = await firstValueFrom(this.profilesClient.send({cmd:'find-profile'},user_id))
    const dataUser = await this.userRepository.findOne({where:{user_id}})
    const data = {...dataUser,...dataProfile}
    console.log(data)
    return plainToInstance(InfoUserDto,data,{
      excludeExtraneousValues:true
    })
  }

  async findAllInfo(user_ids:string[]):Promise<InfoUserDto[]> {
    // console.log(user_id)
    const dataProfiles = await firstValueFrom(this.profilesClient.send({cmd:'find-profiles'},user_ids))
    const mapProfiles = new Map(dataProfiles.map((dt:any) => [dt.user_id,dt]))
    const dataUsers = await this.userRepository.find({where:{user_id:In(user_ids)}})
    const dataReturns = dataUsers.map((dt:any)=>{
      return {...dt,info:mapProfiles.get(dt.user_id)}
    })
    return dataReturns

   
  }
}
