import { IsString } from 'class-validator';

import { transformAndValidate } from '@trxn/common';

export class AngularConfigEnv {
  @IsString()
  API_URI = 'http://localhost:4200/api';
}

export type AppConfig = {
  apiUri: string;
};

export const appConfigValidator = transformAndValidate(AngularConfigEnv);

export const getConfig = (appConfig: unknown): AppConfig => {
  const { API_URI } = appConfigValidator(appConfig);

  return {
    apiUri: API_URI,
  };
};
