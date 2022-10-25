import { StringField } from './string-field';
import { Field } from '../field';

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

/**
 * Checks if a field is a string password field
 */
export function password(field: Field): field is StringPasswordField {
  return field instanceof StringPasswordField;
}
