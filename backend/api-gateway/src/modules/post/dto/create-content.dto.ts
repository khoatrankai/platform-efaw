import { IsString, IsUrl } from 'class-validator';

export class CreateContentDto {
  @IsString()
  description: string;

  @IsUrl({},{ message: 'Invalid picture URL' })
  picture_url: string;

  
}
