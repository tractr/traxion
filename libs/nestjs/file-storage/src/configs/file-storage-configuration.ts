import {
  FileStorageConfigurationPrivate,
  FileStorageConfigurationPublic,
} from '../interfaces';

export function createFileStorageConfiguration(
  config: FileStorageConfigurationPublic,
): FileStorageConfigurationPrivate {
  const DEFAULT_CONFIG = {
    temporaryPrefix: 'temp',
    temporaryFilesTTL: 60 * 60 * 2,
    presignedDownload: {
      defaultValidity: 300,
    },
    presignedUpload: {
      defaultValidity: 300,
      minFileSize: 1024,
      maxFileSize: 10485760,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
    },
  };

  return {
    ...DEFAULT_CONFIG,
    ...config,
    presignedDownload: {
      ...DEFAULT_CONFIG.presignedDownload,
      ...config.presignedDownload,
    },
    presignedUpload: {
      ...DEFAULT_CONFIG.presignedUpload,
      ...config.presignedUpload,
    },
  };
}
