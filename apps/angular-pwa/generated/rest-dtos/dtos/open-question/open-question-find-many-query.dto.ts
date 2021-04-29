import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,

  Min,
} from 'class-validator';

import {
  OpenQuestionInclude,
  SortOrder,
  OpenQuestion,
} from '@generated/models';

export class OpenQuestionFindManyQueryDto {
  @IsString() 
  @IsOptional()
  id?: string;

  @IsString() 
  @IsOptional()
  text?: string;

  @IsString() 
  @IsOptional()
  key?: string;

  @IsString({ each: true })
  @IsIn(OpenQuestionInclude, { each: true })
  @IsOptional()
  populate?: OpenQuestionInclude[];

  @IsOptional()
  @IsString()
  @IsIn([
    'id',
    'text',
    'key',
  ]) 
  sort: keyof OpenQuestion = 'id';

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
