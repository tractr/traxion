import { StringVariations } from '../../interfaces';
import { stringVariants } from '../../utils';
import { BaseField } from '../base-field';

export abstract class BaseEnumField extends BaseField {
  protected _defaultValue: string | undefined;

  protected _values = new Map<string, StringVariations>();

  /**
   * Set default value of the enum
   */
  setDefaultValue(value: string): this {
    this._defaultValue = value;
    return this;
  }

  /**
   * Add a value to the enum
   */
  addValue(value: string): this {
    this._values.set(value, stringVariants(value));
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
  get values(): StringVariations[] {
    return Array.from(this._values.values());
  }
}
