import { IsString, IsEnum, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateContentDto } from './create-content.dto';
export class CreatePostDto {
  @IsEnum(['private', 'public', 'delete', 'friend','private-group'])
  @IsOptional()
  status: string = 'public';

  @IsArray()
  @Type(() => CreateContentDto)
  contents: CreateContentDto[];

  @IsString()
  description: string;

  @IsOptional()
  page: string | null;

  @IsOptional()
  group: string | null;

  @IsEnum(['page', 'group', 'user'])
  type_post: string;

  @IsOptional()
  post_share: string | null;
}
