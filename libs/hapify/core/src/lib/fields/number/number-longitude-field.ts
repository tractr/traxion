import { NumberField } from './number-field';

export class NumberLongitudeField extends NumberField {
  protected _min: number = -180;

  protected _max: number = 180;

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
