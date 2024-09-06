import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFriendDto {
  @IsNotEmpty()
  @IsString()
  readonly friend_id: string;

  @IsNotEmpty()
  @IsString()
  readonly user_id_1: string;

  @IsNotEmpty()
  @IsString()
  readonly user_id_2: string;
}
