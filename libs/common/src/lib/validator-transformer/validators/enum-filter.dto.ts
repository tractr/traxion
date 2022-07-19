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
    if (typeof value !== 'string') return false;

    const [filterType, ...enumValue] = value.split(separator).reverse();

    let filter: string | undefined = filterType;

    if (filterType && !isIn(filterType, EnumFilterProps)) {
      enumValue.unshift(filterType);
      filter = undefined;
    }

    const valueToValidate = enumValue.reverse().join(separator);

    if (each) {
      const arrayToValidate = transformStringToArray(valueToValidate);
      if (!Array.isArray(arrayToValidate)) return false;

      return (
        arrayToValidate.every((v) => isIn(v, enumList)) &&
        (!filter || isIn(filter, ArrayFilterProps))
      );
    }

    return (
      isIn(valueToValidate, enumList) &&
      (!filter || isIn(filter, EnumFilterProps))
    );
  });
}
