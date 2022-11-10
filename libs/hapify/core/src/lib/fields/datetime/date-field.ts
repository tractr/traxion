import { Field } from '../field';

export class DateField extends Field {
  /**
   * Min possible value of the field
   */
  protected _min: Date | undefined;

  /**
   * Max possible value of the field
   */
  protected _max: Date | undefined;

  /**
   * Should show time
   */
  protected _withTime = false;

  /**
   * Set min value of the field
   */
  setMin(min: Date): this {
    this._min = min;
    return this;
  }

  /**
   * Set max value of the field
   */
  setMax(max: Date): this {
    this._max = max;
    return this;
  }

  /**
   * Set if the field should show time
   */
  setWithTime(withTime: boolean): this {
    this._withTime = withTime;
    return this;
  }

  /**
   * Get min value of the field
   */
  get min(): Date | undefined {
    return this._min;
  }

  /**
   * Get max value of the field
   */
  get max(): Date | undefined {
    return this._max;
  }

  /**
   * Get if the field should show time
   */
  get withTime(): boolean {
    return this._withTime;
  }
}

/**
 * Checks if a field is a date field
 */
export function isDate(field: Field): field is DateField {
  return field instanceof DateField;
}
