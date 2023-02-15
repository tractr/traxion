import { isBooleanString, isIn } from 'class-validator';
import { isBoolean } from 'lodash';

import { CustomValidate } from './custom-validate';
import { ArrayFilterProps, BoolFilterProps } from '../../constants';
import { transformStringToArray } from '../../helpers';

/**
 * Accept a field string and return a boolean indicating if the field is a boolean string and filter type
 *
 * @param field - the object field to validate
 */
export function BoolFilterValidate({ separator = ':', each = false } = {}) {
  return CustomValidate((_, value: unknown) => {
    if (!value) return true;
    if (typeof value === 'boolean') return true;
    if (
      (!each && typeof value !== 'string') ||
      (typeof value !== 'string' && !Array.isArray(value))
    )
      return false;

    let filterType: string | undefined;
    let boolean: (string | boolean)[] | undefined = Array.isArray(value)
      ? value
      : [];

    if (typeof value === 'string') {
      [filterType, ...boolean] = value.split(separator).reverse();
    }

    if (
      filterType &&
      !isIn(filterType, each ? ArrayFilterProps : BoolFilterProps)
    ) {
      boolean.unshift(filterType);
      filterType = undefined;
    }

    const valueToValidate = boolean.reverse().join(separator);

    if (each) {
      const arrayToValidate = transformStringToArray(
        Array.isArray(value) ? value : valueToValidate,
      );

      return (
        arrayToValidate.every((v) => isBooleanString(v) || isBoolean(v)) &&
        (!filterType || isIn(filterType, ArrayFilterProps))
      );
    }

    return (
      isBooleanString(valueToValidate) &&
      (!filterType || isIn(filterType, BoolFilterProps))
    );
  });
}
