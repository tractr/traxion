import { Field } from '../field';
import { BooleanField } from './types';

/**
 * Checks if a field is a boolean field
 */
export function isBoolean(field: Field): field is BooleanField {
  return field.type === 'boolean';
}
