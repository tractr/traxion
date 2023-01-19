import { AdminEnv, AppConfig } from '../interfaces';

import { transformAndValidate } from '@trxn/common';

export const validateEnv = transformAndValidate(AdminEnv);

export function getConfig(appConfig: unknown): AppConfig {
  const { API_URL } = validateEnv(appConfig);

  return {
    api: {
      uri: API_URL,
    },
  };
}
