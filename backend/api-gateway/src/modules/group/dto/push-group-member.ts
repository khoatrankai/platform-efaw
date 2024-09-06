  
import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class PushGroupMemberDto {

    @IsString()
    @IsNotEmpty()
    page_id: string;

  }
  