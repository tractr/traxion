
import {

  IsOptional,
  IsString,
} from 'class-validator';

 
export class VariableCountQueryDto {
  @IsString() 
  @IsOptional()
  id?: string;

}
