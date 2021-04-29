
import {  
  IsOptional,
  IsString,
  IsUUID, 
} from 'class-validator';

 
export class QuestionUpsertBodyDto {
  @IsString() 
  title!: string;

  @IsString() 
  text!: string;

  @IsString() 
  @IsUUID("all", ) 
  @IsOptional()
  parentQuestion?: string;

  @IsString({ each: true}) 
  @IsUUID("all", { each: true}) 
  @IsOptional()
  tags?: string[];

}
