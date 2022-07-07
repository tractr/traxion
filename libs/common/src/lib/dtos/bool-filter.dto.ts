import {
  IsBoolean,
  isBooleanString,
  isIn,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { CustomValidate } from '../validator-transformer';

export class BoolFilter {
  @IsBoolean()
  @IsOptional()
  equals?: boolean;

  @ValidateNested()
  not?: BoolFilter;
}

export const BoolFilterProps = ['equals'] as Array<keyof BoolFilter>;

/**
 * Accept a field string and return a boolean indicating if the field is a boolean string and filter type
 *
 * @param field - the object field to validate
 */
export function BoolFilterValidate(separator = ':') {
  return CustomValidate((_, value: string) => {
    if (!value) return true;
    if (typeof value !== 'string') return false;

    const [filterType, ...boolean] = value.split(separator).reverse();

    let filter: string | undefined = filterType;

    if (filterType && !isIn(filterType, BoolFilterProps)) {
      boolean.unshift(filterType);
      filter = undefined;
    }

    return (
      isBooleanString(boolean.reverse().join(separator)) &&
      (!filter || isIn(filter, BoolFilterProps))
    );
  });
}
