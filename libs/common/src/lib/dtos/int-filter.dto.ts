import { IsInt, IsOptional, ValidateNested } from 'class-validator';

export class IntFilter {
  @IsOptional()
  @IsInt()
  equals?: number;

  @IsOptional()
  @IsInt({ each: true })
  in?: Array<number>;

  @IsOptional()
  @IsInt({ each: true })
  notIn?: Array<number>;

  @IsOptional()
  @IsInt()
  lt?: number;

  @IsOptional()
  @IsInt()
  lte?: number;

  @IsOptional()
  @IsInt()
  gt?: number;

  @IsOptional()
  @IsInt()
  gte?: number;

  @IsOptional()
  @ValidateNested()
  not?: IntFilter;
}

export const IntFilterProps = [
  'equals',
  'in',
  'notIn',
  'lt',
  'lte',
  'gt',
  'gte',
] as Array<keyof IntFilter>;
