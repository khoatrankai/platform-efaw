import { Controller, Get, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/database/entities/user.entity';
import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { ResultResponse } from 'src/common/interfaces/result.interface';
import { InfoUserDto } from 'src/dto/info-user.dto';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @MessagePattern({cmd:'register-user'})
  createUser(createUserDto:CreateUserDto): Promise<ResultResponse>{
    return this.userService.createUser(createUserDto)
  }

  @MessagePattern({cmd:'login-user'})
  findUser(username:string): Promise<User>{
    return this.userService.findUser(username)
  }

  @MessagePattern({cmd:'find-profile'})
  findProfileUser(user_id:string): Promise<InfoUserDto>{
    return this.userService.findOneInfo(user_id)
  }
 
  @MessagePattern({cmd:'find-profiles'})
  findAllProfileUser(user_ids:string[]): Promise<InfoUserDto[]>{
    return this.userService.findAllInfo(user_ids)
  }
}
