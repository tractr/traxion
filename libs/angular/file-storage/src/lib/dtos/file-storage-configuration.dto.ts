import { IsString } from 'class-validator';

import { FileStorageConfiguration } from '../interfaces/file-storage-configuration.interface';

export class FileStorageConfigurationDto implements FileStorageConfiguration {
  /**
   * Bucket used by default
   */
  @IsString()
  defaultBucket!: string;

  /**
   * Endpoint to get presigend uploads
   */
  @IsString()
  presignedUploadEndpoint!: string;

  /**
   * Endpoint to get presigned downloads
   */
  @IsString()
  presignedDownloadEndpoint!: string;
}
