  
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class CreateAdminDto {

    @IsString()
    @IsNotEmpty()
    page_id: string;

    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    owner_id: string;

  }
  