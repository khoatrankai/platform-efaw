import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { Group, GroupSchema } from './database/schema/group.schema';
import { GroupMember, GroupMemberSchema } from './database/schema/group-member.schema';

@Module({
  imports: [DatabaseModule, MongooseModule.forFeature([{name: Group.name,schema:GroupSchema},{name: GroupMember.name,schema:GroupMemberSchema}])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
