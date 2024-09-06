import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from 'src/database/entities/friend.entity';
import { CreateFriendDto } from 'src/dto/create-friend.dto';
import { ListFriendDto } from 'src/dto/list-friend.dto';
import { Repository } from 'typeorm';
@Injectable()
export class FriendService {

  constructor(@InjectRepository(Friend) private readonly friendRepository:Repository<Friend>){}
  getHello(): string {
    return 'Hello World!';
  }


  async addFriend(createFriend:CreateFriendDto){
    try{
      const checkFriend = await this.friendRepository.findOne({where:[{user_id_1:createFriend.user_id_1,user_id_2:createFriend.user_id_2},{user_id_1:createFriend.user_id_2,user_id_2:createFriend.user_id_1}]})
      if(checkFriend){
        if(checkFriend.status != 'block'){
          await this.friendRepository.update(checkFriend.friend_id,{...checkFriend,user_id_1:createFriend.user_id_1,user_id_2:createFriend.user_id_2,status:'pending'})
          return {
            statusCode: HttpStatus.OK,
            message:'Kết bạn thành công'
          }
        }else{
          return {
            statusCode: HttpStatus.NOT_FOUND,
            message:'Không tìm thấy người kết'
          }
        }
        
      }else{
        const dataNew = this.friendRepository.create(createFriend)
        await this.friendRepository.save(dataNew) 
        return {
          statusCode: HttpStatus.OK,
          message:'Kết bạn thành công'
        }
      }
    }catch(err){
      throw new InternalServerErrorException
    }
    
  }

  async listFriendBlock(user:ListFriendDto){
    try{
      const checkFriend = (await this.friendRepository.find({where:[{user_id_1:user.user_id,status:'block'},{user_id_2:user.user_id,status:'block'}]})).map((dt:any)=>{
        return dt.user_id_1 === user.user_id ? dt.user_id_2 : dt.user_id_1
      })
      return checkFriend
    }catch(err){
      throw new InternalServerErrorException
    }
    
  }

  async listFriend(user:ListFriendDto){
    try{
      const checkFriend = (await this.friendRepository.find({where:[{user_id_1:user.user_id,status:'accepted'},{user_id_2:user.user_id,status:'accepted'}]})).map((dt:any)=>{
        return dt.user_id_1 === user.user_id ? dt.user_id_2 : dt.user_id_1
      })
      return checkFriend
    }catch(err){
      throw new InternalServerErrorException
    }
    
  }
}
