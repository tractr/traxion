
import {  
  IsString,
} from 'class-validator';

 
export class TagCreateBodyDto {
  @IsString() 
  label!: string;

}
