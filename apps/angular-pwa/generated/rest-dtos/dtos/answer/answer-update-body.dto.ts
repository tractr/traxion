
import {  
  IsOptional,
  IsString,
  IsUUID, 
} from 'class-validator';

 
export class AnswerUpdateBodyDto {
  @IsString() 
  @IsUUID("all", ) 
  @IsOptional()
  user?: string;

  @IsString() 
  @IsUUID("all", ) 
  @IsOptional()
  question?: string;

  @IsString({ each: true}) 
  @IsUUID("all", { each: true}) 
  @IsOptional()
  tags?: string[];

}
