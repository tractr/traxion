import { IsString } from 'class-validator';

import { FileStorageConfiguration } from '../interfaces/file-storage-configuration.interface';

export class FileStorageConfigurationDto implements FileStorageConfiguration {
  @IsString()
  defaultBucket!: string;

  @IsString()
  presignedUploadEndpoint!: string;

  @IsString()
  presignedDownloadEndpoint!: string;
}
