import { isDate, isDateString, isIn } from 'class-validator';

import { ArrayFilterProps, DateTimeFilterProps } from '../../constants';
import { transformStringToArray } from '../../helpers';
import { CustomValidate } from './custom-validate';

/**
 * Accept a field string and return a boolean indicating if the field is an integer string and filter type
 *
 * @param field - the object field to validate
 */
export function DateTimeFilterValidate({ separator = ':', each = false } = {}) {
  return CustomValidate((_, value: unknown) => {
    if (!value) return true;
    if (isDate(value)) return true;
    if (typeof value !== 'string') return false;

    const [filterType, ...dateTime] = value.split(separator).reverse();

    let filter: string | undefined = filterType;

    if (filterType && !isIn(filterType, DateTimeFilterProps)) {
      dateTime.unshift(filterType);
      filter = undefined;
    }

    const valueToValidate = dateTime.reverse().join(separator);

    if (each) {
      const arrayToValidate = transformStringToArray(valueToValidate);
      if (!Array.isArray(arrayToValidate)) return false;

      return (
        arrayToValidate.every(isDateString) &&
        (!filter || isIn(filter, ArrayFilterProps))
      );
    }

    return (
      isDateString(valueToValidate) &&
      (!filter || isIn(filter, DateTimeFilterProps))
    );
  });
}
