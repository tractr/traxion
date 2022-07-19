import { isIn, isString } from 'class-validator';

import { ArrayFilterProps, StringFilterProps } from '../../constants';
import { transformStringToArray } from '../../helpers';
import { CustomValidate } from './custom-validate';

/**
 * Accept a field string and return a boolean indicating if the field is string and filter type
 *
 * @param field - the object field to validate
 */
export function StringFilterValidate({ separator = ':', each = false } = {}) {
  return CustomValidate((_, value: string) => {
    if (!value) return true;
    if (typeof value !== 'string') return false;

    const [filterType, ...string] = value.split(separator).reverse();

    let filter: string | undefined = filterType;

    if (filterType && !isIn(filterType, StringFilterProps)) {
      string.unshift(filterType);
      filter = undefined;
    }

    const valueToValidate = string.reverse().join(separator);

    if (each) {
      const arrayToValidate = transformStringToArray(valueToValidate);
      if (!Array.isArray(arrayToValidate)) return false;

      return (
        arrayToValidate.every(isString) &&
        (!filter || isIn(filter, ArrayFilterProps))
      );
    }

    return (
      isString(valueToValidate) && (!filter || isIn(filter, StringFilterProps))
    );
  });
}
