export interface PresignedUploadConfiguration {
  /**
   * List of allowewd mime types for presigned uploads
   */
  allowedMimeTypes: string[];

  /**
   * Minimum size of file (in bits)
   */
  minFileSize: number;

  /**
   * Maximum size of file (in bits)
   */
  maxFileSize: number;

  /**
   * Default validity duration of presigned upload link
   * (in seconds)
   */
  defaultValidity: number;
}
