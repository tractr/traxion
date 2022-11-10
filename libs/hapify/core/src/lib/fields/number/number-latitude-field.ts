import { Field } from '../field';
import { NumberField } from './number-field';

export class NumberLatitudeField extends NumberField {
  protected _min = -90;

  protected _max = 90;

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
export function isLatitude(field: Field): field is NumberLatitudeField {
  return field instanceof NumberLatitudeField;
}
