import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PostsModule } from './modules/post/post.module';
import { ConfigModule } from '@nestjs/config';
import { FriendModule } from './modules/friend/friend.module';
import { PagesModule } from './modules/page/page.module';
import { GroupsModule } from './modules/group/group.module';

@Module({
  imports: [
   AuthModule,UserModule,PostsModule,FriendModule,PagesModule,GroupsModule,
   ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env',
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
