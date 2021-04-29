/* eslint-disable import/no-cycle */
import {  
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { Tag } from './tag';
import { Answer } from './answer';
import { Message } from './message';
import { OpenQuestion } from './open-question';

 
export class Question {
  @IsString() 
  @IsUUID("all", ) 
  id!: string;

  @IsString() 
  title!: string;

  @IsString() 
  text!: string;

  @ValidateNested() 
  @IsOptional()
  parentQuestion?: Question;

  @ValidateNested({ each: true}) 
  @IsOptional()
  tags?: Tag[];

  @IsOptional()
  @IsString() 
  @IsUUID("all") 
  parentQuestionId?: string;

  @ValidateNested({ each: true}) 
  answerAsQuestion?: Answer[];

  @ValidateNested({ each: true}) 
  messageAsQuestions?: Message[];

  @ValidateNested({ each: true}) 
  openQuestionAsQuestion?: OpenQuestion[];

  @ValidateNested({ each: true}) 
  questionAsParentQuestion?: Question[];

}
