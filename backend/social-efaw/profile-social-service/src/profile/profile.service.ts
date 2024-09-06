import {  HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProfileSocialMedia } from 'src/database/entities/profile.entity';
import { ResultResponse } from 'src/common/interfaces/result.interface';
@Injectable()
export class ProfileService {

  constructor(@InjectRepository(ProfileSocialMedia) private readonly profileRepository:Repository<ProfileSocialMedia>,private configService: ConfigService ){}
  getHello(): string {
    return 'Hello World!';
  }

  async createProfile(user_id:string): Promise<ResultResponse>{
    try{
      const id = uuidv4()
      console.log(user_id)
      const profile =  this.profileRepository.create({profile_id:id,user_id})
      console.log(await this.profileRepository.save(profile)) 
      return {
        statusCode:HttpStatus.CREATED,
        message:'Tạo profile thành công'
      }
    }catch(err){
      return {
        statusCode:HttpStatus.BAD_REQUEST,
        message:'Tạo profile thất bại'
      }
    }
   
    
  }

  async findProfile(user_id:string):Promise<ProfileSocialMedia>{
    const data = await this.profileRepository.findOne({where:{user_id }})
    return data
  }

  async findProfiles(user_ids:string[]):Promise<ProfileSocialMedia[]>{
    const data = await this.profileRepository.find({where:{user_id: In(user_ids)}})
    return data
  }
}
