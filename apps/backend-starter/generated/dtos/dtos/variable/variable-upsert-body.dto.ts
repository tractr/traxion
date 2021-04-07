
import {  
  IsString,
  IsUUID, 
} from 'class-validator';

 
export class VariableUpsertBodyDto {
  @IsString() 
  value!: string;

  @IsString() 
  @IsUUID("all", ) 
  openQuestion!: string;

  @IsString() 
  @IsUUID("all", ) 
  answer!: string;

}
