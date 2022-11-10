import { Field } from '../field';

export class FileField extends Field {
  /**
   * Max size of the file
   */
  protected _maxSize: number | undefined;

  /**
   * Allowed extensions of the file
   */
  protected _allowedExtensions = new Set<string>();

  /**
   * Set max size of the file
   */
  setMaxSize(maxSize: number): this {
    this._maxSize = maxSize;
    return this;
  }

  /**
   * Set allowed extensions of the file
   */
  addAllowedExtension(allowedExtension: string): this {
    this._allowedExtensions.add(allowedExtension);
    return this;
  }

  /**
   * Get max size of the file
   */
  get maxSize(): number | undefined {
    return this._maxSize;
  }

  /**
   * Get allowed extensions of the file
   */
  get allowedExtensions(): string[] {
    return Array.from(this._allowedExtensions);
  }
}

/**
 * Checks if a field is a file field
 */
export function isFile(field: Field): field is FileField {
  return field instanceof FileField;
}
