import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { BadRequestException, ValidationPipe } from '@nestjs/common';
// import { ValidationError } from 'class-validator';

async function bootstrap() {
  // const customValidationPipe = new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   exceptionFactory: (validationErrors: ValidationError[] = []) => {
  //     const customErrors = validationErrors.map((error) => {
  //       if (error.constraints) {
  //         return {
  //           field: error.property,
  //           errors: Object.values(error.constraints),
  //         };
  //       } else {
  //         return {
  //           field: error.property,
  //           errors: [`The ${error.property} field is not allowed to exist`],
  //         };
  //       }
  //     });
  
  //     return new BadRequestException({
  //       statusCode: 400,
  //       message: 'Invalid data',
  //       errors: customErrors,
  //     });
  //   },
  // });
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options:{
        port: 3007
      }
    },
  )
  // app.useGlobalPipes(customValidationPipe)
  app.listen()
}
bootstrap();
