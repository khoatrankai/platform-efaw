  
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class PushPageMemberDto {

    @IsString()
    @IsNotEmpty()
    page_id: string;

  }
  