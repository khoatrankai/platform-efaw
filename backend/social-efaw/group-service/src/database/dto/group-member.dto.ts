  
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class CreateMemberDto {

    @IsString()
    @IsNotEmpty()
    group_id: string;

    @IsString()
    @IsNotEmpty()
    user_id: string;


  }
  