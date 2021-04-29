/* eslint-disable import/no-cycle */
import {  
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { Answer } from './answer';
import { Message } from './message';
import { Question } from './question';

 
export class Tag {
  @IsString() 
  @IsUUID("all", ) 
  id!: string;

  @IsString() 
  label!: string;

  @ValidateNested({ each: true}) 
  answerAsTags?: Answer[];

  @ValidateNested({ each: true}) 
  messageAsTags?: Message[];

  @ValidateNested({ each: true}) 
  questionAsTags?: Question[];

}
