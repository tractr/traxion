
import {  
  IsOptional,
  IsString,
  IsUUID, 
} from 'class-validator';

 
export class VariableUpdateBodyDto {
  @IsString() 
  @IsOptional()
  value?: string;

  @IsString() 
  @IsUUID("all", ) 
  @IsOptional()
  openQuestion?: string;

  @IsString() 
  @IsUUID("all", ) 
  @IsOptional()
  answer?: string;

}
