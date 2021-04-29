
import {  
  IsString,
} from 'class-validator';

 
export class TagUpsertBodyDto {
  @IsString() 
  label!: string;

}
