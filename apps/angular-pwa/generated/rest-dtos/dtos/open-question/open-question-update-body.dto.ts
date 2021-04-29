
import {  
  IsOptional,
  IsString,
  IsUUID, 
} from 'class-validator';

 
export class OpenQuestionUpdateBodyDto {
  @IsString() 
  @IsOptional()
  text?: string;

  @IsString() 
  @IsOptional()
  key?: string;

  @IsString() 
  @IsUUID("all", ) 
  @IsOptional()
  question?: string;

}
