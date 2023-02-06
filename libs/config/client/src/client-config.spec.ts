import {
  BootstrapAppWithConfigOptions,
  fetchConfiguration,
} from './client-config';

describe('fetchConfiguration', () => {
  const key = 'sessionkey';
  const previousData = { config: 'oldClient' };
  const data = { config: 'client' };

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(data),
    });
  });

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.fetch as any).mockClear();
  });

  it('should write config in session storage', async () => {
    const options: BootstrapAppWithConfigOptions<Record<string, unknown>> = {
      sessionStorageKey: key,
      ignoreStorage: false,
    };
    await fetchConfiguration(options);
    expect(window.sessionStorage.getItem(key)).toEqual(JSON.stringify(data));
  });

  it('ignore session ', async () => {
    window.sessionStorage.setItem(key, JSON.stringify(previousData));
    const options: BootstrapAppWithConfigOptions<Record<string, unknown>> = {
      sessionStorageKey: key,
      ignoreStorage: true,
    };

    const config = await fetchConfiguration(options);

    expect(window.sessionStorage.getItem(key)).toEqual(
      JSON.stringify(previousData),
    );
    expect(JSON.stringify(config)).toEqual(JSON.stringify(data));
  });

  it('should return previous data', async () => {
    window.sessionStorage.setItem(key, JSON.stringify(previousData));
    const options: BootstrapAppWithConfigOptions<Record<string, unknown>> = {
      sessionStorageKey: key,
      ignoreStorage: false,
    };
    expect(await fetchConfiguration(options)).toEqual(previousData);
  });
});
