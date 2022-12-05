export async function fetchAppConfigJson<T>(
  url = '/assets/app-config.json',
  getConfig = (config: T) => config as unknown as T,
) {
  const response = await fetch(url);
  const config = await response.json();

  return getConfig(config as T);
}

export interface BootstrapAppWithConfigOptions<T> {
  appConfigUrl?: string;
  sessionStorageKey: string;
  ignoreStorage?: boolean;
  getConfig?: (clientConfig: T) => T;
}

export async function fetchConfiguration<T>(
  options: BootstrapAppWithConfigOptions<T>,
): Promise<T> {
  let config;

  if (options?.ignoreStorage) {
    const fetchedConfig: T = await fetchAppConfigJson(options?.appConfigUrl);
    config = options?.getConfig
      ? options.getConfig(fetchedConfig)
      : fetchedConfig;
  } else {
    const stringifyConfiguration = sessionStorage.getItem(
      options.sessionStorageKey,
    );

    if (typeof stringifyConfiguration === 'string') {
      try {
        config = JSON.parse(stringifyConfiguration);
        // eslint-disable-next-line no-empty
      } catch {}
    }

    if (typeof config === 'undefined') {
      const fetchedConfig: T = await fetchAppConfigJson(options?.appConfigUrl);
      config = options?.getConfig
        ? options.getConfig(fetchedConfig)
        : fetchedConfig;

      sessionStorage.setItem(options.sessionStorageKey, JSON.stringify(config));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any)[options.sessionStorageKey] = config;

  return config;
}
