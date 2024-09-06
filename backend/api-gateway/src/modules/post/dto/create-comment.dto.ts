import { IsArray, IsString, ValidateNested } from 'class-validator';
import { CreateReplyDto } from './create-reply.dto';
import { Type } from 'class-transformer';

export class CreateCommentDto {
  @IsString()
  description: string;

  @IsArray()
  picture_url: string[];

  @IsString()
  user_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateReplyDto)
  reply: CreateReplyDto[];

  

}
