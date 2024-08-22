import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  comment_content_id: string;

  @IsString()
  @IsNotEmpty()
  post_content_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsOptional()
  @IsString()
  comment_owner?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['public', 'private', 'friend', 'delete'])
  @IsOptional()
  status?: 'public' | 'private' | 'friend' | 'delete';

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsOptional()
  created_at?: Date;
}
