import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { catchError, of } from 'rxjs';

import { APP_CONFIG_SERVICE } from './app-config.constant';
import { AppConfig, AppConfigService } from './interfaces';

export function loadConfigFactory<T extends AppConfig>(
  configService: AppConfigService<T>,
) {
  return () =>
    configService.waitInitialisationConfig$.pipe(
      catchError((err) => {
        console.error(err);
        return of({});
      }),
    );
}

export const AppInitializerProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadConfigFactory,
  deps: [APP_CONFIG_SERVICE],
  multi: true,
};
