import { BaseFileField } from '../base-file-field';

export class FileAudioField extends BaseFileField {
  /**
   * Min bitrate in kbps
   */
  protected _minBitrate: number | undefined;

  /**
   * Max bitrate in kbps
   */
  protected _maxBitrate: number | undefined;

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
}
