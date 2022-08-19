import { AdminEnv, AppConfig } from '../interfaces';

import { transformAndValidate } from '@tractr/common';

export const validateEnv = transformAndValidate(AdminEnv);
export const validateAppConfig = transformAndValidate(AppConfig);

export function getConfig(appConfig: Record<string, unknown>): AppConfig {
  const { API_URL } = validateEnv(appConfig);

  return validateAppConfig({
    api: {
      uri: API_URL,
    },
  });
}
