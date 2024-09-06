import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserLoginDto } from 'src/dto/user-login.dto';
import { OtpUserDto } from 'src/dto/otp-user.dto';
import { VerifyUserDto } from 'src/dto/verify-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @MessagePattern({cmd:'register'})
  async registerUser(otpUserDto:OtpUserDto){
    console.log(otpUserDto)
    return await this.authService.register(otpUserDto)
  }

  @MessagePattern({cmd:'verify'})
  async verifyUser(verifyUserDto:VerifyUserDto){
    return await this.authService.verify(verifyUserDto)
  }

  @MessagePattern({cmd:'login'})
  async loginUser(userLoginDto:UserLoginDto){
    return await this.authService.login(userLoginDto)
  }

  @MessagePattern({cmd:'refresh-token'})
  async refreshToken(data:string){
    return await this.authService.refreshTokens(data)
  }
  
}
