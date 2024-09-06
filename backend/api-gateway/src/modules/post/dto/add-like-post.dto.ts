  
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
    user_id: string;

    @IsEnum(['like', 'favourite', 'smile', 'wow', 'sad'])
    status: 'like' | 'favourite' | 'smile' | 'wow' | 'sad';
  }
  