import {
  isIn,
  IsIn,
  IsOptional,
  isString,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CustomValidate } from '../validator-transformer';

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

/**
 * Accept a field string and return a boolean indicating if the field is string and filter type
 *
 * @param field - the object field to validate
 */
export function StringFilterValidate(separator = ':') {
  return CustomValidate((_, value: string) => {
    if (!value) return true;
    if (typeof value !== 'string') return false;

    const [filterType, ...string] = value.split(separator).reverse();

    let filter: string | undefined = filterType;

    if (filterType && !isIn(filterType, StringFilterProps)) {
      string.unshift(filterType);
      filter = undefined;
    }

    return (
      isString(string.reverse().join(separator)) &&
      (!filter || isIn(filter, StringFilterProps))
    );
  });
}
