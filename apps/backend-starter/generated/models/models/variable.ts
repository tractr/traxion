/* eslint-disable import/no-cycle */
import {  
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { OpenQuestion } from './open-question';
import { Answer } from './answer';

 
export class Variable {
  @IsString() 
  @IsUUID("all", ) 
  id!: string;

  @IsString() 
  value!: string;

  @ValidateNested() 
  openQuestion?: OpenQuestion;

  @ValidateNested() 
  answer?: Answer;

  @IsString() 
  @IsUUID("all") 
  openQuestionId!: string;

  @IsString() 
  @IsUUID("all") 
  answerId!: string;

}
