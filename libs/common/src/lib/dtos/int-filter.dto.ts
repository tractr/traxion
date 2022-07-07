import { isIn, IsInt, IsOptional, ValidateNested } from 'class-validator';
import { isInteger } from 'lodash';

import { CustomValidate } from '../validator-transformer';

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

export const IntFilterProps = ['equals', 'lt', 'lte', 'gt', 'gte'] as Array<
  keyof IntFilter
>;

/**
 * Accept a field string and return a boolean indicating if the field is a boolean string and filter type
 *
 * @param field - the object field to validate
 */
export function IntFilterValidate(separator = ':') {
  return CustomValidate((_, value: string) => {
    if (!value) return true;
    if (typeof value !== 'string') return false;

    const [filterType, ...int] = value.split(separator).reverse();

    let filter: string | undefined = filterType;

    if (filterType && !isIn(filterType, IntFilterProps)) {
      int.unshift(filterType);
      filter = undefined;
    }

    return (
      isInteger(Number(int.reverse().join(separator))) &&
      (!filter || isIn(filter, IntFilterProps))
    );
  });
}
