import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GuardModule } from 'src/common/guard/jwt-auth.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [GuardModule,
    ClientsModule.register([
      {
        name: 'GROUP',
        transport:Transport.TCP,
        options:{
          port:3009
        }
      }
    ]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService]
  // exports:[TypeOrmModule]
})
export class GroupsModule {}
