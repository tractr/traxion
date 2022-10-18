import { AppConfig } from './interfaces';

export async function fetchAppConfigJson(url = '/assets/app-config.json') {
  const response = await fetch(url);
  const config: Record<string, unknown> = await response.json();

  return config;
}

export interface FetchConfigurationOptions {
  appConfigUrl?: string;
  getConfig: (angularConfig: Record<string, unknown>) => AppConfig;
}

export const ADMIN_CONFIGURATION_SESSION_STORAGE = 'ADMIN_CONFIGURATION';

export async function fetchConfiguration(
  options: FetchConfigurationOptions,
): Promise<AppConfig> {
  const stringifyConfiguration = sessionStorage.getItem(
    ADMIN_CONFIGURATION_SESSION_STORAGE,
  );

  const { appConfigUrl, getConfig } = options;

  if (typeof stringifyConfiguration === 'string') {
    try {
      const appConfig = JSON.parse(stringifyConfiguration) as Record<
        string,
        unknown
      >;
      // eslint-disable-next-line no-empty

      if (appConfig) return getConfig(appConfig);
      // eslint-disable-next-line no-empty
    } catch {}
  }

  const config = await fetchAppConfigJson(appConfigUrl);

  sessionStorage.setItem(
    ADMIN_CONFIGURATION_SESSION_STORAGE,
    JSON.stringify(config),
  );

  if (typeof config === 'undefined')
    throw new Error('Could not fetch configuration');

  const appConfig = getConfig(config);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any)[ADMIN_CONFIGURATION_SESSION_STORAGE] = appConfig;

  return appConfig;
}
