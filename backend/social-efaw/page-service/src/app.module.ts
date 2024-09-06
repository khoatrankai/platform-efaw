import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './database/schema/page.schema';
import { PageMember, PageMemberSchema } from './database/schema/page-member.schema';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, MongooseModule.forFeature([{name: Page.name,schema:PageSchema},{name: PageMember.name,schema:PageMemberSchema}])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
