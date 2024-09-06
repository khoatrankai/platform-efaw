import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePageDto } from './database/dto/create-page.dto';
import { MessagePattern } from '@nestjs/microservices';
import { CreateMemberDto } from './database/dto/page-member.dto';
import { CreateAdminDto } from './database/dto/page-admin.dto';
import { Schema as MG} from 'mongoose';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({cmd:'create-page'})
  createPage(data:CreatePageDto){
    return this.appService.createPage(data)
  }

  @MessagePattern({cmd:'push-admin'})
  addAdmin(data:CreateAdminDto){
    return this.appService.addAdmin(data)
  }

  @MessagePattern({cmd:'push-member'})
  addMember(data:CreateMemberDto){
    return this.appService.addMember(data)
  }

  @MessagePattern({cmd:'list-page-block-user'})
  listGroupUser(user_id:string){
    return this.appService.getPagesBlockByUser(user_id)
  }

  @MessagePattern({cmd:'find-all-page'})
  findAll(page_ids:MG.Types.ObjectId[]){
    return this.appService.findAll(page_ids)
  }
}
