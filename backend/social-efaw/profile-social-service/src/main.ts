import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { BadRequestException, ValidationPipe } from '@nestjs/common';
// import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options:{
        port: 3006
      }
    },
  )
  // app.useGlobalPipes(customValidationPipe)
  app.listen()
}
bootstrap();
