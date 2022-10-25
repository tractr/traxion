import { NumberField } from './number-field';
import { Field } from '../field';

export class NumberLatitudeField extends NumberField {
  protected _min: number = -90;

  protected _max: number = 90;

  /**
   * Avoid min value to be lower than -90
   */
  setMin(min: number): this {
    return super.setMin(Math.max(min, -90));
  }

  /**
   * Avoid max value to be higher than 90
   */
  setMax(max: number): this {
    return super.setMax(Math.min(max, 90));
  }
}

/**
 * Checks if a field is a number latitude field
 */
export function latitude(field: Field): field is NumberLatitudeField {
  return field instanceof NumberLatitudeField;
}
