import { BaseField } from '../base-field';

export abstract class BaseObjectField extends BaseField {
  protected _defaultValue: Record<string, unknown> | undefined;

  /**
   * Set default value
   */
  setDefaultValue(value: Record<string, unknown>): this {
    this._defaultValue = value;
    return this;
  }

  /**
   * Get default value
   */
  get defaultValue(): Record<string, unknown> | undefined {
    return this._defaultValue;
  }
}
