import { Field } from '../field';
import { FileField } from './file-field';

export class FileVideoField extends FileField {
  /**
   * Min bitrate in kbps
   */
  protected _minBitrate: number | undefined;

  /**
   * Max bitrate in kbps
   */
  protected _maxBitrate: number | undefined;

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
   * Set min bitrate in kbps
   */
  setMinBitrate(minBitrate: number): this {
    this._minBitrate = minBitrate;
    return this;
  }

  /**
   * Set max bitrate in kbps
   */
  setMaxBitrate(maxBitrate: number): this {
    this._maxBitrate = maxBitrate;
    return this;
  }

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
   * Get min bitrate in kbps
   */
  get minBitrate(): number | undefined {
    return this._minBitrate;
  }

  /**
   * Get max bitrate in kbps
   */
  get maxBitrate(): number | undefined {
    return this._maxBitrate;
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
 * Checks if a field is a video file field
 */
export function isFileVideo(field: Field): field is FileVideoField {
  return field instanceof FileVideoField;
}
