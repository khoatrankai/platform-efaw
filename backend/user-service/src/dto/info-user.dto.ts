import { Exclude, Expose } from 'class-transformer';

export class InfoUserDto {
  
  @Expose()
  user_id:string

  @Expose()  
  username: string;

  @Exclude()
  password: string;

  @Expose()
  first_name?: string;

  @Expose()
  last_name?: string;

  @Expose()
  status?: boolean;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  created_at:string

  @Exclude()
  updated_at:string

  @Exclude()
  profile_id: string;

  @Expose()
  bio: string;

  @Expose()
  profile_picture: string;

  @Expose()
  cover_photo: string;

  @Expose()
  date_of_birth?: string; // ISO date format

  @Expose()
  gender: 'male' | 'female';
}