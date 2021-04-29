import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,

  Min,
} from 'class-validator';

import {
  VariableInclude,
  SortOrder,
  Variable,
} from '@generated/models';

export class VariableFindManyQueryDto {
  @IsString() 
  @IsOptional()
  id?: string;

  @IsString({ each: true })
  @IsIn(VariableInclude, { each: true })
  @IsOptional()
  populate?: VariableInclude[];

  @IsOptional()
  @IsString()
  @IsIn([
    'id',
  ]) 
  sort: keyof Variable = 'id';

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
