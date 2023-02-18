import { isIn, isNumber, isNumberString } from 'class-validator';

import { CustomValidate } from './custom-validate';
import { ArrayFilterProps, NumberFilterProps } from '../../constants';
import { transformStringToArray } from '../../helpers';

/**
 * Accept a field string and return a boolean indicating if the field is a boolean string and filter type
 *
 * @param field - the object field to validate
 */
export function NumberFilterValidate({ separator = ':', each = false } = {}) {
  return CustomValidate((_, value: string) => {
    if (!value) return true;
    if (typeof value === 'number') return true;
    if (
      (!each && typeof value !== 'string') ||
      (typeof value !== 'string' && !Array.isArray(value))
    )
      return false;

    let filterType: string | undefined;
    let number: (string | Date)[] | undefined = Array.isArray(value)
      ? value
      : [];

    if (typeof value === 'string') {
      [filterType, ...number] = value.split(separator).reverse();
    }

    if (
      filterType &&
      !isIn(filterType, each ? ArrayFilterProps : NumberFilterProps)
    ) {
      number.unshift(filterType);
      filterType = undefined;
    }

    const valueToValidate = number.reverse().join(separator);

    if (each) {
      const arrayToValidate = transformStringToArray(
        Array.isArray(value) ? value : valueToValidate,
      );

      return (
        arrayToValidate.every((v) => isNumberString(v) || isNumber(v)) &&
        (!filterType || isIn(filterType, ArrayFilterProps))
      );
    }

    return (
      isNumberString(valueToValidate) &&
      (!filterType || isIn(filterType, NumberFilterProps))
    );
  });
}
