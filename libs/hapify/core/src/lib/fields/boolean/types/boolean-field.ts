import { Field } from '../../field';

export class BooleanField extends Field {
  protected _defaultValue: boolean | undefined;

  /**
   * Set default value
   */
  setDefaultValue(value: boolean): this {
    this._defaultValue = value;
    return this;
  }

  /**
   * Get default value
   */
  get defaultValue(): boolean | undefined {
    return this._defaultValue;
  }
}
