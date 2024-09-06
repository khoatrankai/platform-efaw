  
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class CreatePageDto {

    @IsString()
    @IsNotEmpty()
    page_name: string;


  }
  