import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'host.docker.internal',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'db_efaw',
      entities: [Friend],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
