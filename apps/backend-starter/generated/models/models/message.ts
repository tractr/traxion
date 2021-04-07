/* eslint-disable import/no-cycle */
import {  
  IsNumber,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { Tag } from './tag';
import { Question } from './question';

 
export class Message {
  @IsString() 
  @IsUUID("all", ) 
  id!: string;

  @IsString() 
  text!: string;

  @IsNumber({}, )
  @IsDate({}, )
  @IsOptional()
  hour?: Date;

  @ValidateNested({ each: true}) 
  tags?: Tag[];

  @ValidateNested({ each: true}) 
  questions?: Question[];

}
