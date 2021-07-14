import { AppConfig } from '@tractr/angular-config';

export const getConfig = (appConfig: AppConfig) => ({
  test: appConfig.TRACTR_DATABASE_URL,
});
