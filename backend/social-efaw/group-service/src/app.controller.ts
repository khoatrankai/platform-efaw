import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateMemberDto } from './database/dto/group-member.dto';
import { CreateAdminDto } from './database/dto/group-admin.dto';
import { CreateGroupDto } from './database/dto/create-group.dto';
import {Schema as MG} from 'mongoose';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({cmd:'create-group'})
  createGroup(data:CreateGroupDto){
    return this.appService.createGroup(data)
  }

  @MessagePattern({cmd:'push-admin'})
  addAdmin(data:CreateAdminDto){
    return this.appService.addAdmin(data)
  }

  @MessagePattern({cmd:'push-member'})
  addMember(data:CreateMemberDto){
    return this.appService.addMember(data)
  }

  @MessagePattern({cmd:'list-group-user'})
  listGroupUser(user_id:string){
    return this.appService.getGroupsByUser(user_id)
  }

  @MessagePattern({cmd:'list-group-block-user'})
  listGroupBlockUser(user_id:string){
    return this.appService.getPagesBlockByUser(user_id)
  }

  @MessagePattern({cmd:'info-group'})
  infoGroup(group_id:string){
    return this.appService.infoGroup(group_id)
  }

  @MessagePattern({cmd:'find-all-group'})
  findAll(group_ids:MG.Types.ObjectId[]){
    return this.appService.findAll(group_ids)
  }
}
