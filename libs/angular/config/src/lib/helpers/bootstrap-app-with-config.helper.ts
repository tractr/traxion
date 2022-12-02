import { Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {
  BootstrapAppWithConfigOptions,
  fetchConfiguration,
} from '@trxn/client-config';

export async function bootstrapAppWithConfig<AngularConfig>(
  AppModule: Type<unknown>,
  options: BootstrapAppWithConfigOptions<AngularConfig>,
) {
  const config = await fetchConfiguration<AngularConfig>({
    ...options,
  });

  return {
    module: platformBrowserDynamic().bootstrapModule(AppModule),
    config,
  };
}
