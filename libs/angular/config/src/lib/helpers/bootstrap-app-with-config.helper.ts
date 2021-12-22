import { Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AngularConfig } from '../interfaces';
import { fetchAppConfigJson } from './fetch-app-config-json.helper';

export interface BootstrapAppWithConfigOptions<T> {
  appConfigUrl?: string;
  getConfig?: (angularConfig: AngularConfig) => T;
}

export const ANGULAR_CONFIGURATION_SESSION_STORAGE = 'ANGULAR_CONFIGURATION';

export async function bootstrapAppWithConfig<T>(
  AppModule: Type<unknown>,
  options?: BootstrapAppWithConfigOptions<T>,
) {
  const stringifyConfiguration = sessionStorage.getItem(
    ANGULAR_CONFIGURATION_SESSION_STORAGE,
  );

  let config: AngularConfig | undefined;

  if (typeof stringifyConfiguration === 'string') {
    try {
      config = JSON.parse(stringifyConfiguration);
      // eslint-disable-next-line no-empty
    } catch {}
  }

  if (typeof config === 'undefined') {
    config = await fetchAppConfigJson(options?.appConfigUrl);

    sessionStorage.setItem(
      ANGULAR_CONFIGURATION_SESSION_STORAGE,
      JSON.stringify(config),
    );
  }

  const angularConfig =
    options?.getConfig && config ? options?.getConfig(config) : undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any)[ANGULAR_CONFIGURATION_SESSION_STORAGE] = angularConfig;

  return platformBrowserDynamic().bootstrapModule(AppModule);
}
