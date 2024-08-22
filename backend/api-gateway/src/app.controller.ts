import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/users-dto/create-user-request.dto';
import { UserLoginDto } from './dtos/users-dto/user-login.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
  @Post('/sign-up')
  createUser(@Body() createUserRequest: CreateUserDto){
    return this.appService.createUser(createUserRequest)
  }

  @Post('/login')
  loginUser(@Body() userLoginDto:UserLoginDto,@Res() res:Response){
    return this.appService.loginUser(userLoginDto,res)
  }
}
