/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsJSON, IsOptional, IsString } from 'class-validator';

export class JsonFilter {
  @IsJSON()
  @IsOptional()
  equals?: any;

  @IsString({ each: true })
  @IsOptional()
  path?: Array<string>;

  @IsString()
  @IsOptional()
  string_contains?: string;

  @IsString()
  @IsOptional()
  string_starts_with?: string;

  @IsString()
  @IsOptional()
  string_ends_with?: string;

  @IsJSON()
  @IsOptional()
  array_contains?: any;

  @IsJSON()
  @IsOptional()
  array_starts_with?: any;

  @IsJSON()
  @IsOptional()
  array_ends_with?: any;

  @IsJSON()
  @IsOptional()
  lt?: any;

  @IsJSON()
  @IsOptional()
  lte?: any;

  @IsJSON()
  @IsOptional()
  gt?: any;

  @IsJSON()
  @IsOptional()
  gte?: any;

  @IsJSON()
  @IsOptional()
  not?: any;
}

export const JsonFilterProps = [
  'equals',
  'path',
  'string_contains',
  'string_starts_with',
  'string_ends_with',
  'array_contains',
  'array_starts_with',
  'array_ends_with',
  'lt',
  'lte',
  'gt',
  'gte',
  'not',
] as Array<keyof JsonFilter>;
