import { IsEnum, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsString()
  user_id: string;

  @IsString()
  post_id: string;

  @IsEnum(['like','favorite','smile','dislike','sad'])
  status: string;
}
