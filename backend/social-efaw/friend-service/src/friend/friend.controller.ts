import { Controller, Get, UseFilters } from '@nestjs/common';
import { FriendService } from './friend.service';
import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { CreateFriendDto } from 'src/dto/create-friend.dto';
import { MessagePattern } from '@nestjs/microservices';
import { ListFriendDto } from 'src/dto/list-friend.dto';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  getHello(): string {
    return this.friendService.getHello();
  }

  @MessagePattern({cmd: 'add-friend'})
  addFriend(createFriend:CreateFriendDto){
    return this.friendService.addFriend(createFriend)
  }

  @MessagePattern({cmd: 'list-friend-block'})
  listFriendBlock(user:ListFriendDto){
    return this.friendService.listFriendBlock(user)
  }

  @MessagePattern({cmd: 'list-friend'})
  listFriend(user:ListFriendDto){
    return this.friendService.listFriend(user)
  }


 
}
