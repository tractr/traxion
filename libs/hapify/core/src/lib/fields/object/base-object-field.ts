import { Field } from '../field';

export abstract class BaseObjectField extends Field {
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
