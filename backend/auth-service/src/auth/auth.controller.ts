import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserLoginDto } from 'src/dto/user-login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @MessagePattern({cmd:'register'})
  async registerUser(createUserDto:CreateUserDto){
    return await this.authService.register(createUserDto)
  }

  @MessagePattern({cmd:'login'})
  async loginUser(userLoginDto:UserLoginDto){
    return await this.authService.login(userLoginDto)
  }
  
}
