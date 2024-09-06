import {  Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class FriendService {

  constructor(@Inject('FRIEND') private readonly friendClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async addFriend(user_id:string,req:Request){
    const user = req['user']
    const id = uuidv4()
    const data = await firstValueFrom(this.friendClient.send({cmd:'add-friend'},{friend_id:id,user_id_1:user.sub,user_id_2:user_id}))
    return data
  }
  
  async listFriend(req:Request){
    const user = req['user']
    const data = await firstValueFrom(this.friendClient.send({cmd:'list-friend'},{user_id:user.sub}))
    return data
  } 

  async listFriendBlock(req:Request){
    const user = req['user']
    const data = await firstValueFrom(this.friendClient.send({cmd:'list-friend-block'},{user_id:user.sub}))
    return data
  } 

  
}
