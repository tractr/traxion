import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { catchError, of, take, tap } from 'rxjs';

import { AngularConfigService } from './services';

export function loadConfigFactory<T extends Record<string, unknown>>(
  configService: AngularConfigService<T>,
) {
  return () =>
    configService.initialized$.pipe(
      catchError((err) => {
        console.error(err);
        return of({});
      }),
    );
}

export const AngularConfigInitializer: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadConfigFactory,
  deps: [AngularConfigService],
  multi: true,
};
