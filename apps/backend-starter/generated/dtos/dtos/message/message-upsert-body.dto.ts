
import {  
  IsNumber,
  IsDate,
  IsOptional,
  IsString,
  IsUUID, 
} from 'class-validator';

 
export class MessageUpsertBodyDto {
  @IsString() 
  text!: string;

  @IsNumber({}, )
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
