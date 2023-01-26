import { BaseField } from '../base-field';

export class EnumField extends BaseField {
  readonly type = 'enum' as const;
  readonly subType = 'basic' as const;

  protected _defaultValue: string | undefined;

  protected _values = new Set<string>();

  /**
   * Set default value of the enum
   * Ensure that the value is in the enum
   */
  setDefaultValue(value: string): this {
    if (!this._values.has(value)) {
      throw new Error(`Value "${value}" is not in the enum`);
    }
    this._defaultValue = value;
    return this;
  }

  /**
   * Add a value to the enum
   */
  addValue(value: string): this {
    this._values.add(value);
    return this;
  }

  /**
   * Remove a value from the enum
   */
  removeValue(value: string): this {
    this._values.delete(value);
    return this;
  }

  /**
   * Get default value of the enum
   */
  get defaultValue(): string | undefined {
    return this._defaultValue;
  }

  /**
   * Get values of the enum
   */
  get values(): string[] {
    return Array.from(this._values);
  }
}
