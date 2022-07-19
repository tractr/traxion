import { isBooleanString, isIn } from 'class-validator';

import { ArrayFilterProps, BoolFilterProps } from '../../constants';
import { transformStringToArray } from '../../helpers';
import { CustomValidate } from './custom-validate';

/**
 * Accept a field string and return a boolean indicating if the field is a boolean string and filter type
 *
 * @param field - the object field to validate
 */
export function BoolFilterValidate({ separator = ':', each = false } = {}) {
  return CustomValidate((_, value: unknown) => {
    if (!value) return true;
    if (typeof value === 'boolean') return true;
    if (typeof value !== 'string') return false;

    const [filterType, ...boolean] = value.split(separator).reverse();

    let filter: string | undefined = filterType;

    if (filterType && !isIn(filterType, BoolFilterProps)) {
      boolean.unshift(filterType);
      filter = undefined;
    }

    const valueToValidate = boolean.reverse().join(separator);

    if (each) {
      const arrayToValidate = transformStringToArray(valueToValidate);
      if (!Array.isArray(arrayToValidate)) return false;

      return (
        arrayToValidate.every(isBooleanString) &&
        (!filter || isIn(filter, ArrayFilterProps))
      );
    }

    return (
      isBooleanString(valueToValidate) &&
      (!filter || isIn(filter, BoolFilterProps))
    );
  });
}
