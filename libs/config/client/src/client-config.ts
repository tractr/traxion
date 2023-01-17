export async function fetchAppConfigJson<Input, Output>(
  url = '/assets/app-config.json',
  getConfig = (config: Input) => config as unknown as Output,
) {
  const response = await fetch(url);
  const config = await response.json();

  return getConfig(config as Input);
}

export interface BootstrapAppWithConfigOptions<Input, Output> {
  appConfigUrl?: string;
  sessionStorageKey: string;
  ignoreStorage?: boolean;
  getConfig?: (clientConfig: Input) => Output;
}

export async function fetchConfiguration<Intput, Output>(
  options: BootstrapAppWithConfigOptions<Intput, Output>,
): Promise<Output> {
  let config;

  if (options?.ignoreStorage) {
    const fetchedConfig: Intput = await fetchAppConfigJson(
      options?.appConfigUrl,
    );
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
      const fetchedConfig: Intput = await fetchAppConfigJson(
        options?.appConfigUrl,
      );
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
