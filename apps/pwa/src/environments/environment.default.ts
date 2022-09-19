import { IsString } from 'class-validator';

import { AngularConfig } from '@tractr/angular-config';
import { transformAndValidate } from '@tractr/common';

export class AppConfigDto {
  @IsString()
  API_URI = 'http://localhost:4200/api';
}

export type AppConfig = {
  apiUri: string;
};

export const appConfigValidator = transformAndValidate(AppConfigDto);

export const getConfig = (appConfig: AngularConfig): AppConfig => {
  const config = appConfigValidator(appConfig);

  return {
    apiUri: config.API_URI,
  };
};
