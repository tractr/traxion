export async function fetchAppConfigJson<T>(
  url = '/assets/app-config.json',
  getConfig = (config: Record<string, unknown>) => config as unknown as T,
) {
  const response = await fetch(url);
  const config = await response.json();

  return getConfig(config as Record<string, unknown>);
}

export interface BootstrapAppWithConfigOptions<T> {
  appConfigUrl?: string;
  sessionStorageKey: string;
  ignoreStorage?: boolean;
  getConfig?: (clientConfig: Record<string, unknown>) => T;
}

export async function fetchConfiguration<T>(
  options: BootstrapAppWithConfigOptions<T>,
): Promise<T> {
  let config;

  if (options?.ignoreStorage) {
    config = await fetchAppConfigJson(options?.appConfigUrl);
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
      config = await fetchAppConfigJson(options?.appConfigUrl);

      sessionStorage.setItem(options.sessionStorageKey, JSON.stringify(config));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any)[options.sessionStorageKey] = config;

  return config;
}
