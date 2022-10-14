import { Field } from '../field';

export class NumberField extends Field {
  /**
   * Min possible value of the field
   */
  protected _min: number | undefined;

  /**
   * Max possible value of the field
   */
  protected _max: number | undefined;

  /**
   * The step of the number field
   */
  protected _step: number | undefined;

  /**
   * The default value of the field
   */
  protected _defaultValue: number | undefined;

  setMin(min: number): this {
    this._min = min;
    return this;
  }

  setMax(max: number): this {
    this._max = max;
    return this;
  }

  setStep(step: number): this {
    this._step = step;
    return this;
  }

  setDefaultValue(value: number): this {
    this._defaultValue = value;
    return this;
  }

  get min(): number | undefined {
    return this._min;
  }

  get max(): number | undefined {
    return this._max;
  }

  get step(): number | undefined {
    return this._step;
  }

  get defaultValue(): number | undefined {
    return this._defaultValue;
  }
}
