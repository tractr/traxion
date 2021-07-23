import { IsString } from 'class-validator';

import { AngularConfig } from '@tractr/angular-config';
import { FileStorageConfiguration } from '@tractr/angular-file-storage';
import { transformAndValidate } from '@tractr/common';

export class AppConfigDto {
  @IsString()
  API_URI!: string;
}

export type AppConfig = {
  apiUri: string;
  fileStorage: FileStorageConfiguration;
};

export const appConfigValidator = transformAndValidate(AppConfigDto);

export const getConfig = (appConfig: AngularConfig): AppConfig => {
  const config = appConfigValidator(appConfig);
  console.log(config);
  return {
    apiUri: config.API_URI,
    fileStorage: {
      defaultBucket: 'test',
      presignedUploadEndpoint: `${config.API_URI}/file-storage/upload`,
      presignedDownloadEndpoint: `${config.API_URI}/file-storage/download`,
    },
  };
};
