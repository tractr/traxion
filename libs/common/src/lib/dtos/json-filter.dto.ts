/* eslint-disable @typescript-eslint/no-explicit-any */
import { isIn, IsJSON, IsOptional, IsString } from 'class-validator';

import { CustomValidate } from '../validator-transformer';

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

/**
 * Accept a field string and return a boolean indicating if the field is an integer string and filter type
 *
 * @param field - the object field to validate
 */
export function JsonFilterValidate(separator = ':') {
  return CustomValidate((_, value: string) => {
    if (!value) return true;
    if (typeof value !== 'string') return false;

    const [filterType, ...json] = value.split(separator).reverse();

    let filter: string | undefined = filterType;

    if (filterType && !isIn(filterType, JsonFilterProps)) {
      json.unshift(filterType);
      filter = undefined;
    }

    try {
      JSON.parse(json.reverse().join(separator));
    } catch {
      return false;
    }

    return !filter || isIn(filter, JsonFilterProps);
  });
}
