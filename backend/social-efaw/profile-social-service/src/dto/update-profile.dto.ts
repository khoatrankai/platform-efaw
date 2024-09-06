import { IsDateString,  IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
export class UpdateProfileSocialMediaDto {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl()
  profile_picture?: string;

  @IsOptional()
  @IsUrl()
  cover_photo?: string;

  @IsOptional()
  @IsDateString()
  date_of_birth?: string;

  @IsOptional()
  @IsEnum(['male', 'female'])
  gender?: 'male' | 'female';

  @IsOptional()
  @IsEnum(['active', 'delete', 'hide'])
  status?: 'active' | 'delete' | 'hide';
}