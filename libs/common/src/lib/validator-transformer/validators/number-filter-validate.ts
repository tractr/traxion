import { isIn, isNumberString } from 'class-validator';

import { ArrayFilterProps, NumberFilterProps } from '../../constants';
import { transformStringToArray } from '../../helpers';
import { CustomValidate } from './custom-validate';

/**
 * Accept a field string and return a boolean indicating if the field is a boolean string and filter type
 *
 * @param field - the object field to validate
 */
export function NumberFilterValidate({ separator = ':', each = false } = {}) {
  return CustomValidate((_, value: string) => {
    if (!value) return true;
    if (typeof value === 'number') return true;
    if (typeof value !== 'string') return false;

    const [filterType, ...int] = value.split(separator).reverse();

    let filter: string | undefined = filterType;

    if (filterType && !isIn(filterType, NumberFilterProps)) {
      int.unshift(filterType);
      filter = undefined;
    }

    const valueToValidate = int.reverse().join(separator);

    if (each) {
      const arrayToValidate = transformStringToArray(valueToValidate);
      if (!Array.isArray(arrayToValidate)) return false;

      return (
        arrayToValidate.every((v) => isNumberString(v)) &&
        (!filter || isIn(filter, ArrayFilterProps))
      );
    }

    return (
      isNumberString(valueToValidate) &&
      (!filter || isIn(filter, NumberFilterProps))
    );
  });
}
