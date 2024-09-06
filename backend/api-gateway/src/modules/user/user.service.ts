import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { InfoUserInterface } from './interfaces/info-user.interface';
@Injectable()
export class UserService {

  constructor(@Inject('USER') private readonly usersClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

 
  async findOneInfo(user_id:string):Promise<InfoUserInterface> {
    try{
      const dataInfo = await firstValueFrom(this.usersClient.send({cmd:'find-profile'},user_id))
      return dataInfo
    }catch(err){
      throw new InternalServerErrorException
    }
    
  }
}
