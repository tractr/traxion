/* eslint-disable import/no-cycle */
import {  
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { Question } from './question';
import { Variable } from './variable';

 
export class OpenQuestion {
  @IsString() 
  @IsUUID("all", ) 
  id!: string;

  @IsString() 
  text!: string;

  @IsString() 
  key!: string;

  @ValidateNested() 
  question?: Question;

  @IsString() 
  @IsUUID("all") 
  questionId!: string;

  @ValidateNested({ each: true}) 
  variableAsOpenQuestion?: Variable[];

}
