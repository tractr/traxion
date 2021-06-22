import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsPort,
  IsString,
} from 'class-validator';
import { Region } from 'minio';

import { AwsRegions } from '../constants';
import { FileStorageConfiguration } from '../interfaces';
import { PresignedDownloadConfigurationDto } from './presigned-download-configuration.dto';
import { PresignedUploadConfigurationDto } from './presigned-upload-configuration';

export class FileStorageConfigurationDto implements FileStorageConfiguration {
  @IsString()
  endPoint!: string;

  @IsString()
  accessKey!: string;

  @IsString()
  secretKey!: string;

  @IsBoolean()
  useSSL: false;

  @IsPort()
  port!: number;

  @IsIn(AwsRegions)
  @IsOptional()
  region?: Region;

  transport?: any;

  sessionToken?: string;

  partSize?: number;

  pathStyle?: boolean;

  @IsString()
  defaultBucket!: string;

  routePrefix: '';

  @IsString()
  @IsOptional()
  temporaryPrefix: 'temp';

  @IsInt()
  @IsOptional()
  temporaryFilesTTL: 5000;

  presignedUpload: PresignedUploadConfigurationDto;

  presignedDownload: PresignedDownloadConfigurationDto;
}
