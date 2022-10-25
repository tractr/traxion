import { NumberField } from './number-field';
import { Field } from '../field';

export class NumberFloatField extends NumberField {}

/**
 * Checks if a field is a number float field
 */
export function float(field: Field): field is NumberFloatField {
  return field instanceof NumberFloatField;
}
