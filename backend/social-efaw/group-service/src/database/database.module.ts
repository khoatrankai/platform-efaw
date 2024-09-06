import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { Post } from './entities/post.entity';

@Module({
  imports: [
   MongooseModule.forRoot('mongodb://host.docker.internal:27017/db_efaw')
  ],
})
export class DatabaseModule {}
