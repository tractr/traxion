
import {  
  IsString,
  IsUUID,
} from 'class-validator';

 
export class VariableCreateBodyDto {
  @IsString() 
  value!: string;

  @IsString() 
  @IsUUID("all", ) 
  openQuestion!: string;

  @IsString() 
  @IsUUID("all", ) 
  answer!: string;

}
