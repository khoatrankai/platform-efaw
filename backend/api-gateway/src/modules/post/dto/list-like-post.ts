  
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class ListLikePostDto {

    @IsString()
    @IsNotEmpty()
    post_id: string;

  }
  