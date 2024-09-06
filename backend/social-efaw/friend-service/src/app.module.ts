import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { FriendModule } from './friend/friend.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ConflictExceptionFilter } from './common/filters/conflict-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ConflictExceptionFilter,
    },
  ],
  imports: [ ConfigModule.forRoot({
    isGlobal: true, 
  }),
    DatabaseModule,FriendModule
  ]
})
export class AppModule {}
