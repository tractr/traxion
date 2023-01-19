import { Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {
  BootstrapAppWithConfigOptions,
  fetchConfiguration,
} from '@trxn/client-config';

export const ANGULAR_CONFIGURATION_SESSION_STORAGE = 'ANGULAR_CONFIGURATION';

export async function bootstrapAppWithConfig<AngularConfig>(
  AppModule: Type<unknown>,
  options: BootstrapAppWithConfigOptions<AngularConfig>,
) {
  const config = await fetchConfiguration({
    ...options,
  });

  return {
    module: platformBrowserDynamic().bootstrapModule(AppModule),
    config,
  };
}
