import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileSocialMedia } from './entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'host.docker.internal',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'db_efaw',
      entities: [ProfileSocialMedia],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
