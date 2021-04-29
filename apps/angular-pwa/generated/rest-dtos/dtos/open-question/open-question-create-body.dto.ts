
import {  
  IsString,
  IsUUID,
} from 'class-validator';

 
export class OpenQuestionCreateBodyDto {
  @IsString() 
  text!: string;

  @IsString() 
  key!: string;

  @IsString() 
  @IsUUID("all", ) 
  question!: string;

}
