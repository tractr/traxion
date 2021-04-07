
import {  
  IsNumber,
  IsDate,
  IsOptional,
  IsString,
  IsUUID, 
} from 'class-validator';

 
export class MessageUpdateBodyDto {
  @IsString() 
  @IsOptional()
  text?: string;

  @IsNumber({}, )
  @IsDate({}, )
  @IsOptional()
  hour?: Date;

  @IsString({ each: true}) 
  @IsUUID("all", { each: true}) 
  @IsOptional()
  tags?: string[];

  @IsString({ each: true}) 
  @IsUUID("all", { each: true}) 
  @IsOptional()
  questions?: string[];

}
