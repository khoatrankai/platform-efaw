import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { InfoUserInterface } from './interfaces/info-user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Get('info')
  findOneInfo(@Query('user_id') user_id:string): Promise<InfoUserInterface>{
    return this.userService.findOneInfo(user_id)
  }
 
 
}
