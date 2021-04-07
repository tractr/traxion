/* eslint-disable import/no-cycle */
import {  
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { User } from './user';
import { Question } from './question';
import { Tag } from './tag';
import { Variable } from './variable';

 
export class Answer {
  @IsString() 
  @IsUUID("all", ) 
  id!: string;

  @ValidateNested() 
  user?: User;

  @ValidateNested() 
  question?: Question;

  @ValidateNested({ each: true}) 
  @IsOptional()
  tags?: Tag[];

  @IsString() 
  @IsUUID("all") 
  userId!: string;

  @IsString() 
  @IsUUID("all") 
  questionId!: string;

  @ValidateNested({ each: true}) 
  variableAsAnswer?: Variable[];

}
