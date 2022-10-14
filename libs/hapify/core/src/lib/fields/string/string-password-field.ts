import { StringField } from './string-field';

export class StringPasswordField extends StringField {
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
