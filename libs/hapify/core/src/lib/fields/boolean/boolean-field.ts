import { Field } from '../field';

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

/**
 * Checks if a field is a boolean field
 */
export function boolean(field: Field): field is BooleanField {
  return field instanceof BooleanField;
}
