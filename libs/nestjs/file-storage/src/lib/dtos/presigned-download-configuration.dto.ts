import { IsInt, IsOptional } from 'class-validator';

import { PresignedDownloadConfiguration } from '../interfaces';

export class PresignedDownloadConfigurationDto
  implements PresignedDownloadConfiguration
{
  @IsInt()
  @IsOptional()
  defaultValidity: 300;
}
