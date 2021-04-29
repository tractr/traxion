
import {  
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

 
export class MessageCreateBodyDto {
  @IsString() 
  text!: string;

  @IsDate({}, )
  @IsOptional()
  hour?: Date;

  @IsString({ each: true}) 
  @IsUUID("all", { each: true}) 
  tags!: string[];

  @IsString({ each: true}) 
  @IsUUID("all", { each: true}) 
  questions!: string[];

}
