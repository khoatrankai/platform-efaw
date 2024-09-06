import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class ListPostDto {
    @IsString()
    @IsNotEmpty()
    user_id: string;

  
    @IsNotEmpty()
    @IsString()
    page: string;
  
  
   
  }
  