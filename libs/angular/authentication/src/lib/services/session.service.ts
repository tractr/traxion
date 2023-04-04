import { Inject, Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import {
  BehaviorSubject,
  lastValueFrom,
  Observable,
  of,
  Subject,
  throwError,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import {
  catchError,
  map,
  shareReplay,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { AUTHENTICATION_OPTIONS } from '../constants';
import { AuthenticationModuleOptions } from '../types';

import { NotificationService, Unsubscribe } from '@trxn/angular-tools';

@Injectable({
  providedIn: 'root',
})
export class SessionService<
  U extends Record<string, unknown> = Record<string, unknown>,
> extends Unsubscribe {
  /** Store the path to load after login */
  pathAfterLogin: RouterStateSnapshot | null = null;

  refresh$ = new Subject<U | null | void>();

  user$ = new BehaviorSubject<U | null>(null);

  logged$ = new BehaviorSubject<boolean>(false);

  me$: Observable<U | null> = this.refresh$.pipe(
    switchMap((next) => {
      if (typeof next === 'undefined') return this.fetchUser$();
      return of(next);
    }),
    shareReplay(1),
  );

  constructor(
    @Inject(AUTHENTICATION_OPTIONS)
    private readonly options: AuthenticationModuleOptions,
    private readonly notifier: NotificationService,
  ) {
    super();

    // OnInit is never called on angular services only on directive
    // @see https://angular.io/api/core/OnInit
    this.onInit();
  }

  onInit() {
    this.me$.pipe(takeUntil(this.unsubscribe$)).subscribe((me) => {
      this.logged$.next(!!me);
      this.user$.next(me);
    });
  }

  getUser(): U | null {
    return this.user$.getValue();
  }

  isLogged(): boolean {
    return this.logged$.getValue();
  }

  fetchUser$(): Observable<U | null> {
    return fromFetch(this.options.api.getEndpoint('me'), {
      method: 'GET',
      credentials: 'include',
    }).pipe(
      switchMap((response) => {
        if (response.ok) return response.json();
        return throwError(() => new Error(response.statusText));
      }),
      map((user) => {
        if (!this.options.user.validateUser<U>(user)) {
          throw new Error('Invalid user');
        }
        return user;
      }),
      catchError((error) => {
        this.notifier.errors$.next({ error });
        return of(null);
      }),
    );
  }

  refresh(nextUser?: U | null) {
    this.refresh$.next(nextUser);
  }

  /**
   * Send a login request against the nestjs server
   * @param email
   * @param password
   * @returns
   */
  async login(email: string, password: string): Promise<U | null> {
    const body = {
      email,
      password,
    };

    try {
      await fetch(this.options.api.getEndpoint('logout'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const user = await lastValueFrom(this.fetchUser$());

      if (user) {
        this.refresh(user);
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Could not login, wrong email or password');
    }
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    await lastValueFrom(
      fromFetch(this.options.api.getEndpoint('logout'), {
        method: 'POST',
        credentials: 'include',
      }).pipe(
        switchMap((response) => {
          if (response.ok) return of(null);
          return throwError(() => new Error(response.statusText));
        }),
        map(() => this.refresh(null)),
      ),
    );
  }

  /**
   * Define the path to load after login
   * @param route the RouterStateSnapshot parameter
   */
  setPathAfterLogin(route: RouterStateSnapshot | null) {
    this.pathAfterLogin = route;
  }

  /**
   * Get the path to load after login and set it to null
   * @returns the url string or undefined
   */
  popUrlAfterLogin(): string | undefined {
    if (!this.pathAfterLogin) {
      return undefined;
    }
    const { url } = this.pathAfterLogin;
    this.pathAfterLogin = null;
    return url;
  }
}
