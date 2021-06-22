import { IsArray, IsInt, IsMimeType, IsOptional } from 'class-validator';

import { PresignedDownloadConfiguration } from '../interfaces';

export class PresignedUploadConfigurationDto
  implements PresignedDownloadConfiguration
{
  @IsArray()
  @IsMimeType({ each: true })
  @IsOptional()
  allowedMimeTypes: [''];

  @IsInt()
  @IsOptional()
  minFileSize: 300;

  @IsInt()
  @IsOptional()
  maxFileSize: 300;

  @IsInt()
  @IsOptional()
  defaultValidity: 300;
}
