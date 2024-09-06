import { Body, Controller, Get, Post, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { OtpUserDto } from "./dto/otp-user.dto";
import { VerifyUserDto } from "./dto/verify-user.dto";
import { UserLoginDto } from "./dto/user-login.dto";


@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('/sign-up')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createUser(@Body() otpUserDto: OtpUserDto){
    console.log(otpUserDto)
    return this.authService.createUser(otpUserDto)
  }

  @Get('/verify')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  verifyUser(@Query() verifyUserDto: VerifyUserDto){
    return this.authService.verifyUser(verifyUserDto)
  }

  @Post('/login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  loginUser(@Body() userLoginDto:UserLoginDto,@Res() res:Response){
    return this.authService.loginUser(userLoginDto,res)
  }

  @Post('/refresh-token')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  refreshTokenUser(@Res() res:Response,@Req() req:Request){
    return this.authService.refreshToken(res,req)
  }
  
}
