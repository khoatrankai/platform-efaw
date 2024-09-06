import { Transform } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsArray,
  } from 'class-validator';
  
  export class CommentPostDto {

    @IsString()
    @IsNotEmpty()
    post_id: string;

    @IsString()
    user_id: string;

    @IsString()
    description: string;
  
    @IsArray()
    @Transform(({ value }) => value || [])
    picture_url: string[];
  
    @IsArray()
    @Transform(({ value }) => value || [])
    replies: string[];
  }
  