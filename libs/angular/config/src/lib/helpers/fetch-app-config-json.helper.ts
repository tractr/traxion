import { AngularConfig } from '../interfaces';

export async function fetchAppConfigJson<T = AngularConfig>(
  url: string = '/assets/app-config.json',
  getConfig = (config: AngularConfig) => config as unknown as T,
) {
  const response = await fetch(url);
  const config = await response.json();

  return getConfig(config);
}
