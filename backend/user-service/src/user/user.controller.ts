import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  
  @EventPattern('user_created')
  async handleUserCreated() {
   const data = await this.userService.findAll()
   const dataok = await this.userService.getPost()
   console.log('oke', data,dataok)
   return data
  }

 
}
