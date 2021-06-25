export interface FileStorageFormData {
  /**
   * Path of the uploaded file
   */
  key: string;

  /**
   * Bucket where the file will be uploaded
   */
  bucket: string;

  policy: string;
  'x-amz-date': string;
  'x-amz-algorithm': string;
  'x-amz-credential': string;
  'x-amz-signature': string;

  /**
   * File to upload
   */
  file?: File;
}
