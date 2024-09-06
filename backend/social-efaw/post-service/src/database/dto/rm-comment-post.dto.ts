
import {
    IsString,
    IsNotEmpty
  } from 'class-validator';
  
  export class RemoveCommentPostDto {

    @IsString()
    @IsNotEmpty()
    post_id: string;

    @IsString()
    @IsNotEmpty()
    comment_id: string;

    @IsString()
    @IsNotEmpty()
    user_id: string;
  }
  