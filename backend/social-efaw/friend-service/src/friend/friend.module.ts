import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from 'src/database/entities/friend.entity';

@Module({
  imports: [
   
    TypeOrmModule.forFeature([Friend])
  ],
  controllers: [FriendController],
  providers: [FriendService],
  // exports:[TypeOrmModule]
})
export class FriendModule {}
