import { Field } from '../field';

export class StringField extends Field {
  /**
   * Min length of the string
   */
  protected _minLength: number | undefined;

  /**
   * Max length of the string
   */
  protected _maxLength: number | undefined;

  /**
   * Set min length of the string
   */
  setMinLength(minLength: number): this {
    this._minLength = minLength;
    return this;
  }

  /**
   * Set max length of the string
   */
  setMaxLength(maxLength: number): this {
    this._maxLength = maxLength;
    return this;
  }

  /**
   * Get min length of the string
   */
  get minLength(): number | undefined {
    return this._minLength;
  }

  /**
   * Get max length of the string
   */
  get maxLength(): number | undefined {
    return this._maxLength;
  }
}
