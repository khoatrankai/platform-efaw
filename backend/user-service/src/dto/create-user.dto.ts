import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  password: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  first_name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  last_name?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  // @IsEmail()
  // email: string;

  // @IsString()
  // phone: string;
}