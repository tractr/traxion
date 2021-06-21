import { FileStorageConfig } from '../interfaces';

export const FILE_STORAGE_DEFALT_CONFIG: FileStorageConfig = {
  accessKey: 'minio',
  secretKey: 'password',
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  buckets: ['bucket'],
  routePrefix: '',
  temporaryPrefix: 'temp',
  permanentPrefix: '',
  temporaryFilesTTL: 5000,
  presignedUploadDefaults: {
    allowedMimeTypes: [''],
    minFileSize: 300,
    maxFileSize: 300,
    defaultValidity: 300,
  },
  presignedDownloadDefaults: {
    defaultValidity: 300,
  },
};
