
import {

  IsOptional,
  IsString,
} from 'class-validator';

 
export class OpenQuestionCountQueryDto {
  @IsString() 
  @IsOptional()
  id?: string;

  @IsString() 
  @IsOptional()
  text?: string;

  @IsString() 
  @IsOptional()
  key?: string;

}
