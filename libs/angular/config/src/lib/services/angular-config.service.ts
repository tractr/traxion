import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import {
  map,
  mergeMap,
  shareReplay,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';

import { ANGULAR_CONFIGURATION_SESSION_STORAGE } from '../helpers';
import {
  AngularConfig,
  AngularConfigOptions,
  AngularConfigService,
} from '../interfaces';

import { Unsubscriber } from '@tractr/angular-tools';

export function AngularConfigServiceFactory<
  T extends AngularConfig = AngularConfig,
>(angularConfigOptions: AngularConfigOptions<T>): AngularConfigService<T> {
  class AnonymousAngularConfigService extends Unsubscriber {
    constructor() {
      super();

      this.config$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
        this.value$.next(value);
      });
    }

    refresh$ = new BehaviorSubject<T | undefined>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any)[ANGULAR_CONFIGURATION_SESSION_STORAGE],
    );

    value$ = new BehaviorSubject<T | undefined>(undefined);

    getConfig$ = fromFetch(angularConfigOptions.apiEndpoint).pipe(
      mergeMap((response) => from(response.json())),
      map(angularConfigOptions.getConfig),
    );

    config$: Observable<T> = this.refresh$.pipe(
      switchMap((next) => {
        if (typeof next === 'undefined') return this.getConfig$;
        return of(next);
      }),
      shareReplay(1),
    );

    waitInitialisationConfig$: Observable<T> = this.config$.pipe(take(1));

    get config(): T {
      const config = this.value$.getValue();

      if (typeof config === 'undefined')
        throw new Error('The configuration has not been initialized');

      return config;
    }

    set config(value: T) {
      this.refresh$.next(value);
    }

    refresh() {
      this.refresh$.next(undefined);
    }
  }
  return new AnonymousAngularConfigService();
}