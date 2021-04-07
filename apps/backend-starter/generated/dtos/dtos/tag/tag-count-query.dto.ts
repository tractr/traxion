
import {

  IsOptional,
  IsString,
} from 'class-validator';

 
export class TagCountQueryDto {
  @IsString() 
  @IsOptional()
  id?: string;

  @IsString() 
  @IsOptional()
  label?: string;

}
