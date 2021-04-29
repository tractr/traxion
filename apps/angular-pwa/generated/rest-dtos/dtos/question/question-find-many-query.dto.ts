import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,

  Min,
} from 'class-validator';

import {
  QuestionInclude,
  SortOrder,
  Question,
} from '@generated/models';

export class QuestionFindManyQueryDto {
  @IsString() 
  @IsOptional()
  id?: string;

  @IsString() 
  @IsOptional()
  title?: string;

  @IsString() 
  @IsOptional()
  text?: string;

  @IsString({ each: true })
  @IsIn(QuestionInclude, { each: true })
  @IsOptional()
  populate?: QuestionInclude[];

  @IsOptional()
  @IsString()
  @IsIn([
    'id',
    'title',
    'text',
  ]) 
  sort: keyof Question = 'id';

  @IsOptional()
  @IsIn(Object.values(SortOrder)) 
  order: SortOrder = 'asc';

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  take = 100;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  skip = 0;
}
