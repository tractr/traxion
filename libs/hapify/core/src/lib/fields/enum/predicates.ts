import { Field } from '../field';
import { EnumField } from './enum-field';
import { EnumBasicField } from './types';

/**
 * Checks if a field is an enum field
 */
export function isBasicEnum(field: Field): field is EnumBasicField {
  return field instanceof EnumBasicField;
}

/**
 * Test every enum field type
 */
export function isEnum(field: Field): field is EnumField {
  return isBasicEnum(field);
}
