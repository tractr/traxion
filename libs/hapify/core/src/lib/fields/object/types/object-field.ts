import { BaseField } from '../../base-field';

export class ObjectField extends BaseField {
  readonly type = 'object' as const;
  readonly subType = 'basic' as const;

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
