import {   Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePageDto } from './dto/create-page.dto';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
import { PageAdminDto } from './dto/page-admin.dto';
import { PushPageMemberDto } from './dto/push-page-member';
@Injectable()
export class PageService {

  constructor(@Inject('PAGE') private readonly pagesClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async createPage(data:CreatePageDto,req:Request){
    const user = req['user']
    return await firstValueFrom(this.pagesClient.send({cmd:'create-page'},{...data,owner_id:user.sub}))
  }

  
  async pushAdmin(data:PageAdminDto,req:Request){
    const user = req['user']
    return await firstValueFrom(this.pagesClient.send({cmd:'push-admin'},{...data,owner_id:user.sub}))
  }

  async pushMember(data:PushPageMemberDto,req:Request){
    const user = req['user']
    return await firstValueFrom(this.pagesClient.send({cmd:'push-member'},{...data,user_id:user.sub}))
  }
  
}
