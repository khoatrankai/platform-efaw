
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class ListCommentDto {

    @IsString()
    @IsNotEmpty()
    post_id: string;

    @IsString()
    @IsNotEmpty()
    page: string;

    
  }
  