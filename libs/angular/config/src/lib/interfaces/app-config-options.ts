import { AppConfig } from './app-config';

export interface AppConfigOptions<T extends AppConfig = AppConfig> {
  apiEndpoint: string;
  getConfig: (appConfig: Record<string, unknown>) => T;
}
