export interface FileStorageConfiguration {
  /**
   * Bucket used by default
   */
  defaultBucket: string;

  /**
   * Endpoint to get presigend uploads
   */
  presignedUploadEndpoint: string;

  /**
   * Endpoint to get presigned downloads
   */
  presignedDownloadEndpoint: string;
}
