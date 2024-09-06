import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'host.docker.internal',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'db_efaw',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
