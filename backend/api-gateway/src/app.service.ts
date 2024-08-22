import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/users-dto/create-user-request.dto';
import { UserLoginDto } from './dtos/users-dto/user-login.dto';
import { firstValueFrom } from 'rxjs';
import { Response } from 'express';
import { TokenResponse } from './interfaces/token.interface';

@Injectable()
export class AppService {
  private readonly users:any[]=[]

  constructor(@Inject('USER') private readonly usersClient:ClientProxy,@Inject('AUTH') private readonly authClient:ClientProxy,@Inject('POST') private readonly postClient:ClientProxy){}
  getHello() {
    const dl = this.postClient.send({cmd: 'get-list-post'},'user123')
    return dl;
    
  }
  createUser(createUserRequest: CreateUserDto){
    const data = this.authClient.send({cmd:'register'},createUserRequest)
    return data
  }

  async loginUser(userLoginDto:UserLoginDto,res:Response){
    const data:TokenResponse = await firstValueFrom(this.authClient.send({cmd:'login'},userLoginDto))
    res.cookie('accessToken', data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      });

      res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      });
      return res.json({
        message:'Đăng nhập thành công'
      })
  }
}
