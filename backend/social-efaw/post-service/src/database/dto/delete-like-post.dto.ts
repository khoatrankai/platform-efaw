  
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class RemoveLikePostDto {

    @IsString()
    @IsNotEmpty()
    post_id: string;

    @IsString()
    @IsNotEmpty()
    user_id: string;

  }
  