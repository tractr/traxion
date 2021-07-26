import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { catchError, lastValueFrom, of } from 'rxjs';

import { ANGULAR_CONFIG_SERVICE } from './angular-config.constant';
import { AngularConfig, AngularConfigService } from './interfaces';

export function loadConfigFactory<T extends AngularConfig>(
  configService: AngularConfigService<T>,
) {
  return () =>
    lastValueFrom(
      configService.waitInitialisationConfig$.pipe(
        catchError((err) => {
          console.error(err);
          return of({});
        }),
      ),
    );
}

export const AppInitializerProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadConfigFactory,
  deps: [ANGULAR_CONFIG_SERVICE],
  multi: true,
};
