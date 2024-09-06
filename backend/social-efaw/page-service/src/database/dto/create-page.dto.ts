  
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class CreatePageDto {

    @IsString()
    @IsNotEmpty()
    page_name: string;

    @IsString()
    @IsNotEmpty()
    owner_id: string;

  }
  