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
    if (
      (!each && typeof value !== 'string') ||
      (typeof value !== 'string' && !Array.isArray(value))
    )
      return false;

    let filterType: string | undefined;
    let dateTime: (string | Date)[] | undefined = Array.isArray(value)
      ? value
      : [];

    if (typeof value === 'string') {
      [filterType, ...dateTime] = value.split(separator).reverse();
    }

    if (
      filterType &&
      !isIn(filterType, each ? ArrayFilterProps : DateTimeFilterProps)
    ) {
      dateTime.unshift(filterType);
      filterType = undefined;
    }

    const valueToValidate = dateTime.reverse().join(separator);

    if (each) {
      const arrayToValidate = transformStringToArray(
        Array.isArray(value) ? value : valueToValidate,
      );

      return (
        arrayToValidate.every((v) => isDateString(v) || isDate(v)) &&
        (!filterType || isIn(filterType, ArrayFilterProps))
      );
    }

    return (
      isDateString(valueToValidate) &&
      (!filterType || isIn(filterType, DateTimeFilterProps))
    );
  });
}
