import { IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';

export enum QueryMode {
  'default' = 'default',
  insensitive = 'insensitive',
}

export class StringFilter {
  @IsOptional()
  @IsString()
  equals?: string;

  @IsOptional()
  @IsString({ each: true })
  in?: Array<string>;

  @IsOptional()
  @IsString({ each: true })
  notIn?: Array<string>;

  @IsOptional()
  @IsString()
  lt?: string;

  @IsOptional()
  @IsString()
  lte?: string;

  @IsOptional()
  @IsString()
  gt?: string;

  @IsOptional()
  @IsString()
  gte?: string;

  @IsOptional()
  @IsString()
  contains?: string;

  @IsOptional()
  @IsString()
  startsWith?: string;

  @IsOptional()
  @IsString()
  endsWith?: string;

  @IsOptional()
  @IsIn([QueryMode.default, QueryMode.insensitive])
  mode?: keyof typeof QueryMode;

  @IsOptional()
  @ValidateNested()
  not?: StringFilter;
}

export const StringFilterProps = [
  'equals',
  'in',
  'notIn',
  'lt',
  'lte',
  'gt',
  'gte',
  'contains',
  'startsWith',
  'endsWith',
] as Array<keyof StringFilter>;
