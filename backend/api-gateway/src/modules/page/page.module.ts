import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GuardModule } from 'src/common/guard/jwt-auth.module';
import { PageController } from './page.controller';

@Module({
  imports: [GuardModule,
    ClientsModule.register([
      {
        name: 'PAGE',
        transport:Transport.TCP,
        options:{
          port:3008
        }
      }
    ]),
  ],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService]
  // exports:[TypeOrmModule]
})
export class PagesModule {}
