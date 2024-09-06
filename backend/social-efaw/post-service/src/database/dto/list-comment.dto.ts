
import {
    IsString,
    IsNotEmpty,
    IsNumber,
  } from 'class-validator';
  
  export class ListCommentDto {

    @IsString()
    @IsNotEmpty()
    post_id: string;

    @IsNumber()
    @IsNotEmpty()
    page: number;

    
  }
  