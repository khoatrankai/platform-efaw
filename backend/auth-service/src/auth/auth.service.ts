import { HttpStatus, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import bcrypt from 'bcrypt'
// import { UserResponse } from 'src/interfaces/user.interface';
// import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/dto/user-login.dto';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { decryptJson, encryptJson } from 'src/common/utils/crypto-user.util';
import { OtpUserDto } from 'src/dto/otp-user.dto';
import * as speakeasy from 'speakeasy'
import { VerifyUserDto } from 'src/dto/verify-user.dto';

@Injectable()
export class AuthService {

  constructor(@Inject('USER') private readonly usersClient:ClientProxy,@Inject('MAIL') private readonly mailClient:ClientProxy,private jwtService: JwtService,private configService: ConfigService){}
  getHello(): string {
    return 'Hello World!';
  }

  checkIsEmail(data:string){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data);
  }

  checkIsPhoneNumber(data:string){
    const phoneRegex = /^\+?\d{10,15}$/; 
    return phoneRegex.test(data);
  }
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }


  async register(otpUserDto:OtpUserDto){
    const secret = speakeasy.generateSecret({ length: 20 }).base32
    const otp = speakeasy.totp({
      secret: secret, 
      encoding: 'base32',
      step: 300, 
    });
    if(this.checkIsEmail(otpUserDto.username)){
      const data = encryptJson({...otpUserDto,email:otpUserDto.username,phone:null},this.configService.get<string>('CRYPTO_SECRET'))
      this.mailClient.emit({cmd:'send-email'},{to:otpUserDto.username,subject:'Tin nhắn xác nhận',text:`http://localhost:3001/auth/verify?otp=${otp}&data=${data}&secret=${secret}`})
      return {result: data,otp:otp,secret}
    }
    if(this.checkIsPhoneNumber(otpUserDto.username))
    {
      const data = encryptJson({...otpUserDto,phone:otpUserDto.username,email:null},this.configService.get<string>('CRYPTO_SECRET'))
      return {data,otp,secret}
    }
    return {statusCode: HttpStatus.BAD_REQUEST,message:'Thông tin tài khoản không phù hợp'}
   
  }

  async verify(verifyUserDto:VerifyUserDto){
    const verified = speakeasy.totp.verify({
      secret: verifyUserDto.secret,
      encoding: 'base32',
      token: verifyUserDto.otp,
      step: 300, 
      window: 1, 
    });
    if(verified){
      const dataEncord = decryptJson(verifyUserDto.data,this.configService.get<string>('CRYPTO_SECRET'))
      if(Object.keys(dataEncord).length>0){
        return this.usersClient.send({cmd:'register-user'},dataEncord)
      }
    }else{
      return {statusCode:HttpStatus.BAD_REQUEST,message:'Hết hạn otp'}
    }
    
  }

  async login(userLoginDto:UserLoginDto){
    const user = await firstValueFrom(this.usersClient.send({cmd:'login-user'},userLoginDto.username))
    if(user){
      const payload = {email : user.email,sub: user.user_id}
      const accessToken = this.jwtService.sign(payload, { expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] });
      const refreshToken = this.jwtService.sign(payload, { expiresIn: process.env['JWT_REFRESH_TOKEN_EXPIRES_IN'] });
      return {accessToken,refreshToken}
    }
    throw new InternalServerErrorException
  }
  async refreshTokens(refreshToken:string) {  
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env['JWT_ACCESS_TOKEN_SECRET'],
      });

      const newAccessToken = this.jwtService.sign({ sub: payload.sub }, { expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] });
      return {newAccessToken}
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
