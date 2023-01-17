import { BaseStringField } from '../base-string-field';

export class StringRichField extends BaseStringField {
  /**
   * List of layout types allowed:
   *  "h1", "h2", "h3", "p", "blockquote", "pre", "ul", "ol", "li", etc.
   */
  protected _allowedTypes: string[] | undefined;

  /**
   * Set allowed types
   */
  setAllowedTypes(regex: string[]): this {
    this._allowedTypes = regex;
    return this;
  }

  /**
   * Get allowed types
   */
  get allowedTypes(): string[] | undefined {
    return this._allowedTypes;
  }
}
