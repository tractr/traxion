import { Field } from '../field';
import { NumberField } from './number-field';

export class NumberFloatField extends NumberField {}

/**
 * Checks if a field is a number float field
 */
export function isFloat(field: Field): field is NumberFloatField {
  return field instanceof NumberFloatField;
}
