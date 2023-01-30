import { BaseNumberField } from '../base-number-field';

export class NumberLongitudeField extends BaseNumberField {
  readonly type = 'number' as const;
  readonly subType = 'longitude' as const;

  protected override _min = -180;

  protected override _max = 180;

  /**
   * Avoid min value to be lower than -180
   */
  override setMin(min: number): this {
    return super.setMin(Math.max(min, -180));
  }

  /**
   * Avoid max value to be higher than 180
   */
  override setMax(max: number): this {
    return super.setMax(Math.min(max, 180));
  }
}
