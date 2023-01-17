import { Field } from '../field';
import { ObjectField } from './object-field';
import { ObjectBasicField } from './types';

/**
 * Checks if a field is a basic object field
 */
export function isBasicObject(field: Field): field is ObjectBasicField {
  return field instanceof ObjectBasicField;
}

/**
 * Test every object field type
 */
export function isObject(field: Field): field is ObjectField {
  return isBasicObject(field);
}
