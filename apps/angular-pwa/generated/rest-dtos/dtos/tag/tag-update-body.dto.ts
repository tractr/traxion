
import {  
  IsOptional,
  IsString,
} from 'class-validator';

 
export class TagUpdateBodyDto {
  @IsString() 
  @IsOptional()
  label?: string;

}
