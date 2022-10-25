import { NumberField } from './number-field';
import { Field } from '../field';

export class NumberIntegerField extends NumberField {}

/**
 * Checks if a field is a number integer field
 */
export function integer(field: Field): field is NumberIntegerField {
  return field instanceof NumberIntegerField;
}
