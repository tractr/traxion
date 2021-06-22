import { FileStorageFormData } from './file-storage-form-data.interface';

export interface FileStoragePresignedPostToken {
  postUrl: string;
  formData: FileStorageFormData;
}
