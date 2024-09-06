import {  Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

import { Request } from 'express';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

 
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addFriend(@Body('user_id') user_id:string,@Req() req:Request){
   
    return this.friendService.addFriend(user_id,req)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  listFriend(@Req() req:Request){
   
    return this.friendService.listFriend(req)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/list-block')
  listFriendBlock(@Req() req:Request){
   
    return this.friendService.listFriendBlock(req)
  }
  
 
 
}
