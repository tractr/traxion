import { Field } from '../field';
import { ObjectField } from './types';

/**
 * Checks if a field is an object field
 */
export function isObject(field: Field): field is ObjectField {
  return field.type === 'object';
}
