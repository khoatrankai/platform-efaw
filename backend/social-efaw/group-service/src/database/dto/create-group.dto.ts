  
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class CreateGroupDto {

    @IsString()
    @IsNotEmpty()
    group_name: string;

    @IsString()
    @IsNotEmpty()
    owner_id: string;

  }
  