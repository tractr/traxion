
import {

  IsOptional,
  IsString,
} from 'class-validator';

 
export class AnswerCountQueryDto {
  @IsString() 
  @IsOptional()
  id?: string;

}
