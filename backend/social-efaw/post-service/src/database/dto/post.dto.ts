import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEnum,
    IsArray,
    IsMongoId,
  } from 'class-validator';
import { Types } from 'mongoose';
  
  export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    user_id: string;
  
    @IsEnum(['private', 'public', 'delete', 'friend', 'private-group'])
    status: string;
  
    @IsArray()
    contents: string[];
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsMongoId()
    page?: Types.ObjectId;
  
    @IsOptional()
    @IsMongoId()
    group?: Types.ObjectId;
  
    @IsEnum(['page', 'group', 'user'])
    type_post: string;
  
    @IsOptional()
    @IsMongoId()
    post_share?: Types.ObjectId;
  }
  