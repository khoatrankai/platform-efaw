import { Controller, Get, UseFilters } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { MessagePattern } from '@nestjs/microservices';
import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { ResultResponse } from 'src/common/interfaces/result.interface';
import { ProfileSocialMedia } from 'src/database/entities/profile.entity';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getHello(): string {
    return this.profileService.getHello();
  }

  @MessagePattern({cmd:'create-profile'})
  createProfile(user_id:string): Promise<ResultResponse>{
    console.log('profile',user_id)
    return this.profileService.createProfile(user_id)
  }

  @MessagePattern({cmd:'find-profile'})
  findOneProfile(user_id:string): Promise<ProfileSocialMedia>{
    return this.profileService.findProfile(user_id)
  }

  @MessagePattern({cmd:'find-profiles'})
  findAllProfiles(user_ids:string[]): Promise<ProfileSocialMedia[]>{
    return this.profileService.findProfiles(user_ids)
  }
 
}
