import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileSocialMedia } from 'src/database/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileSocialMedia])
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  // exports:[TypeOrmModule]
})
export class ProfileModule {}
