/**
 * Result of a file upload to file storage
 */
export interface FileStorageUploadResult {
  /**
   * Url of the uploaded file
   */
  url: string;

  /**
   * MIME type of the uploaded file
   */
  mimeType: string;

  /**
   * File size of the uploaded file (in bits)
   */
  size: number;
}
