import { BaseNumberField } from '../base-number-field';

export class NumberLatitudeField extends BaseNumberField {
  readonly type = 'number' as const;
  readonly subType = 'latitude' as const;

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
