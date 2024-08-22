import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'src/dto/create-user.dto';
import bcrypt from 'bcrypt'
// import { UserResponse } from 'src/interfaces/user.interface';
// import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/dto/user-login.dto';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(@Inject('USER') private readonly usersClient:ClientProxy,private jwtService: JwtService,private configService: ConfigService){}
  getHello(): string {
    return 'Hello World!';
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, process.env['SALT']);
    return hashedPassword;
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }


  async register(createUserDto:CreateUserDto){
   const data = this.usersClient.send({cmd:'register-user'},createUserDto)
   return data
  }

  async login(userLoginDto:UserLoginDto){
    console.log(userLoginDto.username)
    const user = await firstValueFrom(this.usersClient.send({cmd:'login-user'},userLoginDto.username))
    if(user){
      const payload = {email : user.email,sub: user.user_id}
      const accessToken = this.jwtService.sign(payload, { expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] });
      const refreshToken = this.jwtService.sign(payload, { expiresIn: process.env['JWT_REFRESH_TOKEN_EXPIRES_IN'] });
      return {accessToken,refreshToken}
    }
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
