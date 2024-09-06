  
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class GroupAdminDto {

    @IsString()
    @IsNotEmpty()
    group_id: string;

    @IsString()
    @IsNotEmpty()
    user_id: string;
  }
  