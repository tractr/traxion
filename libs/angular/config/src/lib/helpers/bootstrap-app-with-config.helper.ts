import { Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {
  BootstrapAppWithConfigOptions,
  fetchConfiguration,
} from '@tractr/client-config';

export const ANGULAR_CONFIGURATION_SESSION_STORAGE = 'ANGULAR_CONFIGURATION';

export async function bootstrapAppWithConfig<AngularConfig>(
  AppModule: Type<unknown>,
  options?: BootstrapAppWithConfigOptions<AngularConfig>,
) {
  const config = await fetchConfiguration<AngularConfig>({
    ...options,
    sessionStorageKey: ANGULAR_CONFIGURATION_SESSION_STORAGE,
  });

  return {
    module: platformBrowserDynamic().bootstrapModule(AppModule),
    config,
  };
}
