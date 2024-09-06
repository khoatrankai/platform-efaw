import { IsString, IsNotEmpty } from 'class-validator';

export class ListFriendDto {

  @IsNotEmpty()
  @IsString()
  readonly user_id: string;

}
