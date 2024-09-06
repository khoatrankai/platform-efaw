
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class RemoveCommentPostDto {

    @IsString()
    @IsNotEmpty()
    post_id: string;

    @IsString()
    comment_id: string;

    
    
  }
  