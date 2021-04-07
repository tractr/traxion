
import {  
  IsOptional,
  IsString,
  IsUUID, 
} from 'class-validator';

 
export class QuestionUpdateBodyDto {
  @IsString() 
  @IsOptional()
  title?: string;

  @IsString() 
  @IsOptional()
  text?: string;

  @IsString() 
  @IsUUID("all", ) 
  @IsOptional()
  parentQuestion?: string;

  @IsString({ each: true}) 
  @IsUUID("all", { each: true}) 
  @IsOptional()
  tags?: string[];

}
