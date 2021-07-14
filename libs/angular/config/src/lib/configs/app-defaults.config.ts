import { AppConfig, AppConfigOptions } from '../interfaces';

export const APP_DEFAULTS_OPTIONS: AppConfigOptions = {
  apiEndpoint: 'assets/app-config.json',
  getConfig: (appConfig: AppConfig) => appConfig,
};
