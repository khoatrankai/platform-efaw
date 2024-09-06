import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupAdminDto } from './dto/group-admin.dto';
import { GroupService } from './group.service';
import { PushGroupMemberDto } from './dto/push-group-member';


@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create-group')
  createGroup(@Body() data:CreateGroupDto,@Req() req:Request){
    return this.groupService.createGroup(data,req)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/push-admin')
  addAdmin(@Body() data:GroupAdminDto,@Req() req:Request){
    return this.groupService.pushAdmin(data,req)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/push-member')
  addMember(@Body() data:PushGroupMemberDto,@Req() req:Request){
    return this.groupService.pushMember(data,req)
  }
 
 
}
