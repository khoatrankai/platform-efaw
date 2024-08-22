import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEnum,
    IsUrl,
  } from 'class-validator';
  import { Transform } from 'class-transformer';
  
  export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    post_id: string;
  
    @IsEnum(['user', 'page', 'group'])
    typePost: 'user' | 'page' | 'group';
  
    @IsOptional()
    @IsString()
    page_id?: string;
  
    @IsOptional()
    @IsString()
    group_id?: string;
  
    @IsString()
    @IsNotEmpty()
    user_id: string;
  
    @IsOptional()
    @IsString()
    share_id?: string;
  
    @IsOptional()
    @IsString()
    content_main?: string;
  
    @IsOptional()
    @IsUrl()
    picture_url?: string;

    @IsEnum(['public', 'delete', 'friend', 'private', 'privateGroup'])
    @IsOptional()
    status?: 'public' | 'delete' | 'friend' | 'private' | 'privateGroup';
  
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    @IsOptional()
    created_at?: Date;
  }
  