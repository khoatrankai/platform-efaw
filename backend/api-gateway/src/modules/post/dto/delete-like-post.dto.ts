  
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class RemoveLikePostDto {

    @IsString()
    @IsNotEmpty()
    post_id: string;

    @IsString()
    user_id: string;

  }
  