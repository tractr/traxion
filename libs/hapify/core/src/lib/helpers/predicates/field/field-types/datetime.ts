import { DateField, Field, TimeField } from '../../../../nodes';

/**
 * Checks if a field is a date field
 */
export function isDate(field: Field): field is DateField {
  return field.type === 'date';
}

/**
 * Checks if a field is time field
 */
export function isTime(field: Field): field is TimeField {
  return field.type === 'time';
}
