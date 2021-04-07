import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,

  Min,
} from 'class-validator';

import {
  TagInclude,
  SortOrder,
  Tag,
} from '@generated/models';

export class TagFindManyQueryDto {
  @IsString() 
  @IsOptional()
  id?: string;

  @IsString() 
  @IsOptional()
  label?: string;

  @IsString({ each: true })
  @IsIn(Object.values(TagInclude), { each: true })
  @IsOptional()
  populate?: TagInclude[];

  @IsOptional()
  @IsString()
  @IsIn([
    'id',
    'label',
  ]) 
  sort: keyof Tag = 'id';

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
