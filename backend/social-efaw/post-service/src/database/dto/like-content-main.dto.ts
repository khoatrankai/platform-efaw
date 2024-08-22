import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateLikeContentMainDto {
  @IsString()
  @IsNotEmpty()
  like_content_main_id: string;

  @IsString()
  @IsNotEmpty()
  post_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsEnum(['like', 'favourite', 'smile', 'wow', 'sad'])
  status: 'like' | 'favourite' | 'smile' | 'wow' | 'sad';

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsOptional()
  created_at?: Date;
}
