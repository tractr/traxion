import { Inject, Injectable, OnDestroy } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { ClassConstructor } from 'class-transformer';
import { BehaviorSubject, lastValueFrom, Observable, of } from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { AUTHENTICATION_OPTIONS, AUTHENTICATION_USER_DTO } from '../constants';
import { AuthenticationOptions } from '../dtos';

import { request, Unsubscriber } from '@tractr/angular-tools';
import { transformAndValidate } from '@tractr/common';

@Injectable()
export class SessionService<
    U extends Record<string, unknown> = Record<string, unknown>,
  >
  extends Unsubscriber
  implements OnDestroy
{
  /** Route for login */
  sessionUrl: string;

  /** Route for password login */
  loginUrl: string;

  /** Route for password logout */
  logoutUrl: string;

  /** Store the path to load after login */
  pathAfterLogin: RouterStateSnapshot | null = null;

  refresh$ = new BehaviorSubject<U | null | void>(undefined);

  logged$ = new BehaviorSubject<boolean>(false);

  me$: Observable<U | null> = this.refresh$.pipe(
    switchMap((next) => {
      if (typeof next === 'undefined') return this.fetchUser$();
      return of(next);
    }),
    shareReplay(1),
  );

  constructor(
    @Inject(AUTHENTICATION_USER_DTO)
    private readonly user: ClassConstructor<U>,

    @Inject(AUTHENTICATION_OPTIONS)
    private readonly options: AuthenticationOptions,
  ) {
    super();

    this.sessionUrl = `${options.api.url}/${options.session.url}`;
    this.loginUrl = `${options.api.url}/${options.login.url}`;
    this.logoutUrl = `${options.api.url}/${options.logout.url}`;

    // OnInit is never called on angular services only on directive
    // @see https://angular.io/api/core/OnInit
    this.onInit();
  }

  onInit() {
    this.me$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (me) => {
        this.logged$.next(!!me);
      },
    });
  }

  isLogged(): boolean {
    return this.logged$.getValue();
  }

  fetchUser$(): Observable<U | null> {
    return request<U>({
      url: this.sessionUrl,
      method: 'GET',
      withCredentials: true,
    }).pipe(
      map((value) => value.response),
      map((value) => transformAndValidate(this.user)(value) as U),
      catchError(() => of(null)),
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
      request({
        url: this.loginUrl,
        method: 'POST',
        withCredentials: true,
        body,
      }).pipe(
        switchMap(() => this.fetchUser$()),
        tap((user) => this.refresh(user)),
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
}
