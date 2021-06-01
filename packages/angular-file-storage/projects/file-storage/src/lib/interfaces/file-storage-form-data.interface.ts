export interface FileStorageFormData {
  key: string;
  bucket: string;
  policy: string;
  'x-amz-date': string;
  'x-amz-algorithm': string;
  'x-amz-credential': string;
  'x-amz-signature': string;
  file?: File;
}
