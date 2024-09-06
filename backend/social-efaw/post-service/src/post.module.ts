import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchema } from './database/schema/post.schema';
import { Comment, CommentSchema } from './database/schema/comment.schema';
import { Contents, ContentSchema } from './database/schema/content.schema';
import { Like, LikeSchema } from './database/schema/like.schema';
import { Reply, ReplySchema } from './database/schema/reply.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [DatabaseModule,
    ClientsModule.register([
      {
        name: 'FRIEND',
        transport:Transport.TCP,
        options:{
          port:3007
        }
      },
      {
        name: 'USER',
        transport:Transport.TCP,
        options:{
          port:3003
        }
      },
      {
        name: 'GROUP',
        transport:Transport.TCP,
        options:{
          port:3009
        }
      },
      {
        name: 'PAGE',
        transport:Transport.TCP,
        options:{
          port:3008
        }
      }
    ]),
    MongooseModule.forFeature([{name: Posts.name,schema:PostSchema},{name: Comment.name,schema:CommentSchema},{name: Contents.name,schema:ContentSchema},{name: Like.name,schema:LikeSchema},{name: Reply.name,schema:ReplySchema}])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
