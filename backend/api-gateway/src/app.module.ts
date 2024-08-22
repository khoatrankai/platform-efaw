import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER',
        transport:Transport.TCP,
        options:{
          port:3003
        }
      },
      {
        name: 'AUTH',
        transport:Transport.TCP,
        options:{
          port:3002
        }
      },
      {
        name: 'POST',
        transport:Transport.TCP,
        options:{
          port:3004
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
