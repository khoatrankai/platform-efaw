import {   Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupAdminDto } from './dto/group-admin.dto';
import { PushGroupMemberDto } from './dto/push-group-member';
@Injectable()
export class GroupService {

  constructor(@Inject('GROUP') private readonly groupsClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async createGroup(data:CreateGroupDto,req:Request){
    const user = req['user']
    return await firstValueFrom(this.groupsClient.send({cmd:'create-group'},{...data,owner_id:user.sub}))
  }

  
  async pushAdmin(data:GroupAdminDto,req:Request){
    const user = req['user']
    return await firstValueFrom(this.groupsClient.send({cmd:'push-admin'},{...data,owner_id:user.sub}))
  }

  async pushMember(data:PushGroupMemberDto,req:Request){
    const user = req['user']
    return await firstValueFrom(this.groupsClient.send({cmd:'push-member'},{...data,user_id:user.sub}))
  }
  
}
