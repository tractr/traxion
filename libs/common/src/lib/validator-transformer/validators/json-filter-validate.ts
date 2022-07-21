/* eslint-disable @typescript-eslint/no-explicit-any */
import { isIn, isObject } from 'class-validator';

import { JsonFilterProps } from '../../constants';
import { CustomValidate } from './custom-validate';

/**
 * Accept a field string and return a boolean indicating if the field is an object string with filter type
 *
 * @param field - the object field to validate
 */
export function JsonFilterValidate({ separator = ':' } = {}) {
  return CustomValidate((_, value: unknown) => {
    if (!value) return true;
    if (isObject(value)) return true;
    if (Array.isArray(value)) return true;
    if (typeof value !== 'string') return false;

    const [filterType, ...json] = value.split(separator).reverse();

    let filter: string | undefined = filterType;

    if (filterType && !isIn(filterType, JsonFilterProps)) {
      json.unshift(filterType);
      filter = undefined;
    }

    try {
      JSON.parse(json.reverse().join(separator));
    } catch {
      return false;
    }

    return !filter || isIn(filter, JsonFilterProps);
  });
}
