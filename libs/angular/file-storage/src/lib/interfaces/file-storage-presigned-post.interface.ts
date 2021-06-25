import { FileStorageFormData } from './file-storage-form-data.interface';

export interface FileStoragePresignedPostToken {
  /**
   * Url that must be used to upload the file
   *  to file storage
   */
  postUrl: string;

  /**
   * formData that must be used to upload
   * the file to file storage
   */
  formData: FileStorageFormData;
}
