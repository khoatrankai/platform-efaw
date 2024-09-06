import { IsArray, IsString } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  description: string;

  @IsArray()
  picture_url: string[];

  @IsString()
  reply_id:string

  @IsString()
  user_id:string

}
