import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,

  Min,
} from 'class-validator';

import {
  MessageInclude,
  SortOrder,
  Message,
} from '@generated/models';

export class MessageFindManyQueryDto {
  @IsString() 
  @IsOptional()
  id?: string;

  @IsString() 
  @IsOptional()
  text?: string;

  @IsString({ each: true })
  @IsIn(MessageInclude, { each: true })
  @IsOptional()
  populate?: MessageInclude[];

  @IsOptional()
  @IsString()
  @IsIn([
    'id',
    'text',
  ]) 
  sort: keyof Message = 'id';

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
