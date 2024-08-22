import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostContentDto {
  @IsString()
  @IsNotEmpty()
  post_content_id: string;

  @IsString()
  @IsNotEmpty()
  post_id: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsUrl()
  picture_url?: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsOptional()
  created_at?: Date;
}
