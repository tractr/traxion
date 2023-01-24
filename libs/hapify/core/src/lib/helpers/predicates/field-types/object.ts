import { Field, ObjectField } from '../../../nodes';

/**
 * Checks if a field is an object field
 */
export function isObject(field: Field): field is ObjectField {
  return field.type === 'object';
}
