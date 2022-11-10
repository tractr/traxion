import { Field } from '../field';
import { FileField } from './file-field';

export class FileImageField extends FileField {
  /**
   * Max width of the image
   */
  protected _maxWidth: number | undefined;

  /**
   * Max height of the image
   */
  protected _maxHeight: number | undefined;

  /**
   * Min width of the image
   */
  protected _minWidth: number | undefined;

  /**
   * Min height of the image
   */
  protected _minHeight: number | undefined;

  /**
   * Set max width of the image
   */
  setMaxWidth(maxWidth: number): this {
    this._maxWidth = maxWidth;
    return this;
  }

  /**
   * Set max height of the image
   */
  setMaxHeight(maxHeight: number): this {
    this._maxHeight = maxHeight;
    return this;
  }

  /**
   * Set min width of the image
   */
  setMinWidth(minWidth: number): this {
    this._minWidth = minWidth;
    return this;
  }

  /**
   * Set min height of the image
   */
  setMinHeight(minHeight: number): this {
    this._minHeight = minHeight;
    return this;
  }

  /**
   * Get max width of the image
   */
  get maxWidth(): number | undefined {
    return this._maxWidth;
  }

  /**
   * Get max height of the image
   */
  get maxHeight(): number | undefined {
    return this._maxHeight;
  }

  /**
   * Get min width of the image
   */
  get minWidth(): number | undefined {
    return this._minWidth;
  }

  /**
   * Get min height of the image
   */
  get minHeight(): number | undefined {
    return this._minHeight;
  }
}

/**
 * Checks if a field is an image file field
 */
export function isFileImage(field: Field): field is FileImageField {
  return field instanceof FileImageField;
}
