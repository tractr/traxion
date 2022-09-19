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
    if (
      (!each && typeof value !== 'string') ||
      (typeof value !== 'string' && !Array.isArray(value))
    )
      return false;

    let filterType: string | undefined;
    let string: (string | Date)[] | undefined = Array.isArray(value)
      ? value
      : [];

    if (typeof value === 'string') {
      [filterType, ...string] = value.split(separator).reverse();
    }

    if (
      filterType &&
      !isIn(filterType, each ? ArrayFilterProps : StringFilterProps)
    ) {
      string.unshift(filterType);
      filterType = undefined;
    }

    const valueToValidate = string.reverse().join(separator);

    if (each) {
      const arrayToValidate = transformStringToArray(
        Array.isArray(value) ? value : valueToValidate,
      );

      return (
        arrayToValidate.every(isString) &&
        (!filterType || isIn(filterType, ArrayFilterProps))
      );
    }

    return (
      isString(valueToValidate) &&
      (!filterType || isIn(filterType, StringFilterProps))
    );
  });
}
