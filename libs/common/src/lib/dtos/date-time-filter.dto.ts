import {
  IsDate,
  isDateString,
  isIn,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { CustomValidate } from '../validator-transformer';

export class DateTimeFilter {
  @IsDate()
  @IsOptional()
  equals?: Date;

  @IsDate({ each: true })
  @IsOptional()
  in?: Array<Date>;

  @IsDate({ each: true })
  @IsOptional()
  notIn?: Array<Date>;

  @IsDate()
  @IsOptional()
  lt?: Date;

  @IsDate()
  @IsOptional()
  lte?: Date;

  @IsDate()
  @IsOptional()
  gt?: Date;

  @IsDate()
  @IsOptional()
  gte?: Date;

  @ValidateNested()
  not?: DateTimeFilter;
}

export const DateTimeFilterProps = [
  'equals',
  'in',
  'notIn',
  'lt',
  'lte',
  'gt',
  'gte',
] as Array<keyof DateTimeFilter>;

/**
 * Accept a field string and return a boolean indicating if the field is an integer string and filter type
 *
 * @param field - the object field to validate
 */
export function DateTimeFilterValidate(separator = ':') {
  return CustomValidate((_, value: string) => {
    if (!value) return true;
    if (typeof value !== 'string') return false;

    const [filterType, ...dateTime] = value.split(separator).reverse();

    let filter: string | undefined = filterType;

    if (filterType && !isIn(filterType, DateTimeFilterProps)) {
      dateTime.unshift(filterType);
      filter = undefined;
    }

    return (
      isDateString(dateTime.reverse().join(separator)) &&
      (!filter || isIn(filter, DateTimeFilterProps))
    );
  });
}
