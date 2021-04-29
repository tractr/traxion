
import {

  IsOptional,
  IsString,
} from 'class-validator';

 
export class QuestionCountQueryDto {
  @IsString() 
  @IsOptional()
  id?: string;

  @IsString() 
  @IsOptional()
  title?: string;

  @IsString() 
  @IsOptional()
  text?: string;

}
