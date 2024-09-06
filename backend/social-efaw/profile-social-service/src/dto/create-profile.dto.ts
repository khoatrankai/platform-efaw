import {
  IsString,
  IsOptional,
  IsUrl,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateProfileSocialMediaDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  profile_id: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  user_id: string;

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
  date_of_birth?: string; // ISO date format

  @IsOptional()
  @IsEnum(['male', 'female'])
  gender?: 'male' | 'female';

  @IsOptional()
  @IsEnum(['active', 'delete', 'hide'])
  status?: 'active' | 'delete' | 'hide';
}
