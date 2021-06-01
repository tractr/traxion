export interface PresignedUploadOptions {
  allowedMimeTypes: string[];
  minFileSize: number;
  maxFileSize: number;
  defaultValidity: number;
}
