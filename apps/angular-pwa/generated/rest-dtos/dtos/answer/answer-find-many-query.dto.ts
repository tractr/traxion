import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,

  Min,
} from 'class-validator';

import {
  AnswerInclude,
  SortOrder,
  Answer,
} from '@generated/models';

export class AnswerFindManyQueryDto {
  @IsString() 
  @IsOptional()
  id?: string;

  @IsString({ each: true })
  @IsIn(AnswerInclude, { each: true })
  @IsOptional()
  populate?: AnswerInclude[];

  @IsOptional()
  @IsString()
  @IsIn([
    'id',
  ]) 
  sort: keyof Answer = 'id';

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
