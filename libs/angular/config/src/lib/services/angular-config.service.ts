import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, of, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import {
  catchError,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';

import { ANGULAR_CONFIG_OPTIONS } from '../angular-config.constant';
import { AngularConfigModuleOptions } from '../interfaces';

import { Unsubscribe } from '@trxn/angular-tools';
import { getConfigFromSessionStorage } from '@trxn/client-config';

@Injectable({ providedIn: 'root' })
export class AngularConfigService<
  T extends Record<string, unknown> = Record<string, unknown>,
> extends Unsubscribe {
  constructor(
    @Inject(ANGULAR_CONFIG_OPTIONS)
    private readonly options: AngularConfigModuleOptions,
  ) {
    super();

    this.updateConfig$
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(() => of(undefined)),
      )
      .subscribe((config) => {
        this.config$.next(config);
      });
  }

  refresh$ = new BehaviorSubject<T | undefined>(
    // This trick is because angular does not wait for the APP_INITIALIZER to finish
    getConfigFromSessionStorage(this.options.sessionStorageKey),
  );

  config$ = new BehaviorSubject<T | undefined>(undefined);

  initialized$ = this.config$.asObservable().pipe(
    filter((config) => typeof config !== 'undefined'),
    take(1),
    shareReplay(1),
  );

  fetchConfig$ = fromFetch(this.options.configurationEndpoint).pipe(
    switchMap((response) => {
      if (response.ok) return from(response.json() as Promise<T>);
      return throwError(() => response.statusText);
    }),
    map((value) => {
      if (this.options.transformConfig)
        return this.options.transformConfig(value) as T;
      return value;
    }),
  );

  updateConfig$ = this.refresh$.asObservable().pipe(
    switchMap((refreshed) => {
      if (!refreshed) return this.fetchConfig$;
      return of(refreshed);
    }),
  );

  get config(): T {
    const config = this.config$.getValue();

    if (typeof config === 'undefined')
      throw new Error('The configuration has not been initialized');

    return config;
  }
}
