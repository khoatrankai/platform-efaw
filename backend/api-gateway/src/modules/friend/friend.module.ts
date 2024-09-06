import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GuardModule } from 'src/common/guard/jwt-auth.module';
import { FriendController } from './friend.controller';

@Module({
  imports: [GuardModule,
    ClientsModule.register([
      {
        name: 'FRIEND',
        transport:Transport.TCP,
        options:{
          port:3007
        }
      }
    ]),
  ],
  controllers: [FriendController],
  providers: [FriendService],
  exports: [FriendService]
  // exports:[TypeOrmModule]
})
export class FriendModule {}
