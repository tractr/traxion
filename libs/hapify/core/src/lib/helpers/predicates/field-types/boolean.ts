import { BooleanField, Field } from '../../../nodes';

/**
 * Checks if a field is a boolean field
 */
export function isBoolean(field: Field): field is BooleanField {
  return field.type === 'boolean';
}
