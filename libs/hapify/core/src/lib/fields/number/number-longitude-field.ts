import { Field } from '../field';
import { NumberField } from './number-field';

export class NumberLongitudeField extends NumberField {
  protected _min = -180;

  protected _max = 180;

  /**
   * Avoid min value to be lower than -180
   */
  setMin(min: number): this {
    return super.setMin(Math.max(min, -180));
  }

  /**
   * Avoid max value to be higher than 180
   */
  setMax(max: number): this {
    return super.setMax(Math.min(max, 180));
  }
}

/**
 * Checks if a field is a number longitude field
 */
export function isLongitude(field: Field): field is NumberLongitudeField {
  return field instanceof NumberLongitudeField;
}
