  
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class PageAdminDto {

    @IsString()
    @IsNotEmpty()
    page_id: string;

    @IsString()
    @IsNotEmpty()
    user_id: string;
  }
  