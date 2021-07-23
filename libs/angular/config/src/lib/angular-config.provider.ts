import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { catchError, of, tap } from 'rxjs';

import { ANGULAR_CONFIG_SERVICE } from './angular-config.constant';
import { AngularConfig, AngularConfigService } from './interfaces';

export function loadConfigFactory<T extends AngularConfig>(
  configService: AngularConfigService<T>,
) {
  console.log('oninit loadConfigFactory service');
  return () =>
    configService.waitInitialisationConfig$.pipe(
      catchError((err) => {
        console.error(err);
        return of({});
      }),
      tap(() => console.log('config loaded')),
    );
}

export const AppInitializerProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadConfigFactory,
  deps: [ANGULAR_CONFIG_SERVICE],
  multi: true,
};
