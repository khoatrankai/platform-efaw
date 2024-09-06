import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { PageAdminDto } from './dto/page-admin.dto';
import { PushPageMemberDto } from './dto/push-page-member';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create-page')
  createPage(@Body() data:CreatePageDto,@Req() req:Request){
    return this.pageService.createPage(data,req)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/push-admin')
  addAdmin(@Body() data:PageAdminDto,@Req() req:Request){
    return this.pageService.pushAdmin(data,req)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/push-member')
  addMember(@Body() data:PushPageMemberDto,@Req() req:Request){
    return this.pageService.pushMember(data,req)
  }
 
 
}
