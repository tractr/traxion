
import {  
  IsOptional,
  IsString,
  IsUUID, 
} from 'class-validator';

 
export class AnswerUpsertBodyDto {
  @IsString() 
  @IsUUID("all", ) 
  user!: string;

  @IsString() 
  @IsUUID("all", ) 
  question!: string;

  @IsString({ each: true}) 
  @IsUUID("all", { each: true}) 
  @IsOptional()
  tags?: string[];

}
