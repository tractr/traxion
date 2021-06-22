export interface PresignedUploadConfiguration {
  allowedMimeTypes: string[];
  minFileSize: number;
  maxFileSize: number;
  defaultValidity: number;
}
