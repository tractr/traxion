import { BaseScalarField } from '../base-scalar-field';

export class BooleanField extends BaseScalarField {
  readonly type = 'boolean' as const;
  readonly subType = 'basic' as const;

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
