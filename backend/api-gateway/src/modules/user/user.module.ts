import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER',
        transport:Transport.TCP,
        options:{
          port:3003
        }
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
  // exports:[TypeOrmModule]
})
export class UserModule {}
