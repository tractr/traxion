import { IsString } from 'class-validator';

import { FileStorageConfiguration } from '../interfaces/file-storage-configuration.interface';

export class FileStorageConfigurationDto implements FileStorageConfiguration {
  @IsString()
  defaultBucket!: string;

  presignedUploadEndpoint!: string;

  presignedDownloadEndpoint!: string;
}
