import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}
  getHello(): string {
    return 'Hello World!';
  }

  
  async createUser(registerDto:CreateUserDto): Promise<User>{
    try{
      const id = uuidv4()
      const user =  this.userRepository.create({...registerDto,user_id:id,username:id})
      return await this.userRepository.save(user)
    }catch(err){
      throw new Error('No create new user')
    }
      
    
  }

  async updateUser(user_id:string,updateDto:UpdateUserDto):Promise<User>{
    await this.userRepository.update(user_id,updateDto);
    return this.userRepository.findOne({where:{user_id: user_id}})
  }

  async findUser(username:string):Promise<User>{
    const data = await this.userRepository.findOne({where:{username:username}})
    return data
  }
}
