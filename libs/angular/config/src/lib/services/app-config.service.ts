import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';

import { AppConfig, AppConfigOptions, AppConfigService } from '../interfaces';

export function appConfigServiceFactory<T extends AppConfig = AppConfig>(
  http: HttpClient,
  appConfigOptions: AppConfigOptions<T>,
): AppConfigService<T> {
  class AnonymousAppConfigService {
    refresh$ = new BehaviorSubject<T | void>(undefined);

    getConfig$ = http
      .get<Record<string, unknown>>(appConfigOptions.apiEndpoint)
      .pipe(map(appConfigOptions.getConfig));

    config$: Observable<T> = this.refresh$.pipe(
      switchMap((next) => {
        if (typeof next === 'undefined') return this.getConfig$;
        return of(next);
      }),
      shareReplay(1),
    );

    waitInitialisationConfig$: Observable<T> = this.config$.pipe(take(1));
  }
  return new AnonymousAppConfigService();
}
