
import {  
  IsString,
  IsUUID, 
} from 'class-validator';

 
export class OpenQuestionUpsertBodyDto {
  @IsString() 
  text!: string;

  @IsString() 
  key!: string;

  @IsString() 
  @IsUUID("all", ) 
  question!: string;

}
