  
import {
    IsString,
    IsNotEmpty,
    IsEnum,
  } from 'class-validator';
  
  export class AddLikePostDto {

    @IsString()
    @IsNotEmpty()
    post_id: string;

    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsEnum(['like', 'favourite', 'smile', 'wow', 'sad'])
    status: 'like' | 'favourite' | 'smile' | 'wow' | 'sad';
  }
  