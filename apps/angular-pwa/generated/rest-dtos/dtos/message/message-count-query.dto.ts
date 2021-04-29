
import {

  IsOptional,
  IsString,
} from 'class-validator';

 
export class MessageCountQueryDto {
  @IsString() 
  @IsOptional()
  id?: string;

  @IsString() 
  @IsOptional()
  text?: string;

}
