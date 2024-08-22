import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/database/entities/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @MessagePattern({cmd:'register-user'})
  createUser(createUserDto:CreateUserDto): Promise<User>{
    try{
      
    }catch(err){
      throw new HttpException('No create new user',HttpStatus.BAD_REQUEST)
    }
    return this.userService.createUser(createUserDto)
  }

  @MessagePattern({cmd:'login-user'})
  findUser(username:string): Promise<User>{
    return this.userService.findUser(username)
  }
 
}
