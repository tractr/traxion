import { BaseStringField } from '../base-string-field';

export class StringPasswordField extends BaseStringField {
  readonly type = 'string' as const;
  readonly subType = 'password' as const;

  protected _validationRegex: string | undefined;

  /**
   * Set validation regex
   */
  setValidationRegex(regex: string): this {
    this._validationRegex = regex;
    return this;
  }

  /**
   * Get validation regex
   */
  get validationRegex(): string | undefined {
    return this._validationRegex;
  }
}
