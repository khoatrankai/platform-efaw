import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostController } from './post.controller';
import { GuardModule } from 'src/common/guard/jwt-auth.module';

@Module({
  imports: [GuardModule,
    ClientsModule.register([
      {
        name: 'POST',
        transport:Transport.TCP,
        options:{
          port:3004
        }
      }
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
  // exports:[TypeOrmModule]
})
export class PostsModule {}
