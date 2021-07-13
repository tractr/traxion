import { OnDestroy, OnInit } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { ClassConstructor } from 'class-transformer';
import { BehaviorSubject, lastValueFrom, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { AuthenticationOptions } from '../authentication.config';
import { User } from '../generated/models';
import { SessionService, SessionServiceClass } from '../interfaces';

import { request } from '@tractr/angular-tools';
import { transformAndValidate } from '@tractr/common';

export function SessionServiceFactory<
  U extends User = User,
  CCU extends ClassConstructor<U> = ClassConstructor<U>,
>(options: AuthenticationOptions<U, CCU>): SessionService<U> {
  const { user } = options;

  const AnonymousSessionService = class
    implements SessionService<U>, OnInit, OnDestroy
  {
    /** Route for login */
    sessionUrl: string;

    /** Route for password login */
    loginUrl: string;

    /** Route for password logout */
    logoutUrl: string;

    /** Store the path to load after login */
    pathAfterLogin: RouterStateSnapshot | null = null;

    unsubscribe: Subject<void> = new Subject<void>();

    refresh$ = new BehaviorSubject<U | null | void>(undefined);

    logged$ = new BehaviorSubject<boolean>(false);

    constructor() {
      this.sessionUrl = `${options.api.url}/${options.session.url}`;
      this.loginUrl = `${options.api.url}/${options.login.url}`;
      this.logoutUrl = `${options.api.url}/${options.logout.url}`;

      this.ngOnInit();
    }

    me$: Observable<U | null> = this.refresh$.pipe(
      switchMap((next) => {
        if (typeof next === 'undefined') return this.fetchUser$();
        return of(next);
      }),
      catchError((err) => {
        if (err && err.status === 401) return of(null);
        throw err;
      }),
      shareReplay(1),
    );

    ngOnInit() {
      this.me$
        .pipe(
          takeUntil(this.unsubscribe),
          map((nextUser) => !!nextUser),
        )
        .subscribe((logged) => {
          this.logged$.next(logged);
        });
    }

    ngOnDestroy() {
      this.unsubscribe.next();
    }

    isLogged(): boolean {
      return this.logged$.getValue();
    }

    fetchUser$(): Observable<U> {
      return request<U>({
        url: this.sessionUrl,
        method: 'GET',
        withCredentials: true,
      }).pipe(
        map((value) => value.response),
        map((value) => transformAndValidate(user)(value) as U),
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

      const userLogged = await lastValueFrom(
        request<{ user: U }>({
          url: this.loginUrl,
          method: 'POST',
          withCredentials: true,
          body,
        }).pipe(
          map((value) => value.response.user),
          map((value) => transformAndValidate(user)(value) as U),
          tap((nextUser) => this.refresh(nextUser)),
          catchError(() => {
            throw new Error('Could not login, wrong email or password');
          }),
        ),
      );

      return userLogged;
    }

    /**
     * Logout current user
     */
    async logout(): Promise<void> {
      await lastValueFrom(
        request({
          url: this.logoutUrl,
          method: 'GET',
          withCredentials: true,
        }).pipe(map(() => this.refresh(null))),
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
  } as unknown as SessionServiceClass<U>;

  return new AnonymousSessionService();
}
