export async function fetchAppConfigJson<Output = unknown>(
  url = '/assets/app-config.json',
  getConfig = (config: unknown) => config as Output,
): Promise<Output> {
  const response = await fetch(url);
  const config: unknown = await response.json();

  return getConfig(config);
}

export interface BootstrapAppWithConfigOptions<Output = unknown> {
  appConfigUrl?: string;
  sessionStorageKey: string;
  ignoreStorage?: boolean;
  getConfig?: (clientConfig: unknown) => Output;
}

export async function fetchConfiguration<Output>({
  sessionStorageKey,
  appConfigUrl,
  getConfig,
  ignoreStorage,
}: BootstrapAppWithConfigOptions<Output>): Promise<Output> {
  let config: Output | undefined;

  if (ignoreStorage) {
    config = await fetchAppConfigJson(appConfigUrl, getConfig);
  } else {
    const stringifyConfiguration = sessionStorage.getItem(sessionStorageKey);

    if (typeof stringifyConfiguration === 'string') {
      try {
        config = JSON.parse(stringifyConfiguration);
        // eslint-disable-next-line no-empty
      } catch {}
    }

    if (typeof config === 'undefined') {
      config = await fetchAppConfigJson(appConfigUrl, getConfig);
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(config));
    }
  }

  if (typeof window !== 'undefined')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window)[sessionStorageKey] = config;

  return config;
}
