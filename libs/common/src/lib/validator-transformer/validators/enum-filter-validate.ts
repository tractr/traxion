import { isIn } from 'class-validator';

import { ArrayFilterProps, EnumFilterProps } from '../../constants';
import { transformStringToArray } from '../../helpers';
import { CustomValidate } from './custom-validate';

/**
 * Accept a field string and return a boolean indicating if the field is string and filter type
 *
 * @param field - the object field to validate
 */
export function EnumFilterValidate(
  enumList: string[],
  { separator = ':', each = false } = {},
) {
  return CustomValidate((_, value: string) => {
    if (!value) return true;
    if (
      (!each && typeof value !== 'string') ||
      (typeof value !== 'string' && !Array.isArray(value))
    )
      return false;

    let filterType: string | undefined;
    let enums: (string | Date)[] | undefined = Array.isArray(value)
      ? value
      : [];

    if (typeof value === 'string') {
      [filterType, ...enums] = value.split(separator).reverse();
    }

    if (
      filterType &&
      !isIn(filterType, each ? ArrayFilterProps : EnumFilterProps)
    ) {
      enums.unshift(filterType);
      filterType = undefined;
    }

    const valueToValidate = enums.reverse().join(separator);

    if (each) {
      const arrayToValidate = transformStringToArray(
        Array.isArray(value) ? value : valueToValidate,
      );

      return (
        arrayToValidate.every((v) => isIn(v, enumList)) &&
        (!filterType || isIn(filterType, ArrayFilterProps))
      );
    }

    return (
      isIn(valueToValidate, enumList) &&
      (!filterType || isIn(filterType, EnumFilterProps))
    );
  });
}
