import { Field } from '../field';
import { NumberField } from './number-field';

export class NumberIntegerField extends NumberField {}

/**
 * Checks if a field is a number integer field
 */
export function isInteger(field: Field): field is NumberIntegerField {
  return field instanceof NumberIntegerField;
}
