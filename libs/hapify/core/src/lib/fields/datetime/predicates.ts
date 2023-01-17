import { Field } from '../field';
import { DateField, TimeField } from './types';

/**
 * Checks if a field is a date field
 */
export function isDate(field: Field): field is DateField {
  return field instanceof DateField;
}

/**
 * Checks if a field is time field
 */
export function isTime(field: Field): field is TimeField {
  return field instanceof TimeField;
}
