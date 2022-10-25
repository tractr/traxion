import { Field } from '../field';

export class ObjectField extends Field {
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

/**
 * Checks if a field is an object field
 */
export function object(field: Field): field is ObjectField {
  return field instanceof ObjectField;
}
