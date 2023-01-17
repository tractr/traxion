import { Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {
  BootstrapAppWithConfigOptions,
  fetchConfiguration,
} from '@trxn/client-config';

export const ANGULAR_CONFIGURATION_SESSION_STORAGE = 'ANGULAR_CONFIGURATION';

export async function bootstrapAppWithConfig<AngularConfigEnv, AngularConfig>(
  AppModule: Type<unknown>,
  options: BootstrapAppWithConfigOptions<AngularConfigEnv, AngularConfig>,
) {
  const config = await fetchConfiguration<AngularConfigEnv, AngularConfig>({
    ...options,
  });

  return {
    module: platformBrowserDynamic().bootstrapModule(AppModule),
    config,
  };
}
