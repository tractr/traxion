import { Inject, Injectable, OnInit } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { lastValueFrom, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../../generated/models';
import {
  AUTH_OPTIONS,
  AuthenticationOptionsInterface,
} from '../authentication.config';

import { transformAndValidate } from '@generated/rext-client';
import { request } from '@tractr/angular-tools';
import { ClassConstructor } from 'class-transformer';

import { SessionServiceClass, SessionService } from '../interfaces';

export function SessionServiceFactory<
  U extends User,
  T extends ClassConstructor<U>,
>(user: T): SessionServiceClass<U> {
  const sessionService = class implements SessionService<U>, OnInit {
    /** Route for login */
    sessionUrl: string;

    /** Route for password login */
    loginUrl: string;

    /** Route for password logout */
    logoutUrl: string;

    /** Flag to denote if calling for current */
    callingCurrent = false;

    /** Store the path to load after login */
    pathAfterLogin: RouterStateSnapshot | null = null;

    /** Self */
    userSubject = new Subject<U | null>();

    userValue: U | null = null;

    get user(): U | null {
      return this.userValue;
    }

    set user(selfUser: U | null) {
      this.userValue = selfUser;
      this.userSubject.next(selfUser);
    }

    constructor(public readonly options: AuthenticationOptionsInterface) {
      this.sessionUrl = `${this.options.api.url}/${this.options.session.url}`;
      this.loginUrl = `${this.options.api.url}/${this.options.login.url}`;
      this.logoutUrl = `${this.options.api.url}/${this.options.logout.url}`;
    }

    async ngOnInit() {
      await this.current();
    }

    /** Retrieve current session info from api */
    async current(): Promise<U | null> {
      this.callingCurrent = true;
      try {
        const loggedUser = await lastValueFrom(
          request<U>({
            url: this.sessionUrl,
            method: 'GET',
            withCredentials: true,
          }).pipe(
            map((value) => value.response),
            map((userInterface) => {
              if (userInterface) {
                try {
                  return transformAndValidate(user)(userInterface) as U;
                } catch (err: unknown) {
                  console.error(
                    "Return of session route can't be transformed in User",
                    err,
                  );
                }
              }

              return null;
            }),
          ),
        );

        if (!loggedUser) throw new Error('user not found');

        this.user = loggedUser;
        this.callingCurrent = false;

        return this.user;
      } catch (err) {
        // Catch unauthorized http error (user not connected)
        if (err && err.status === 401) {
          return null;
        }
        throw err;
      }
    }

    /**
     * Send a login request against the nestjs server
     * @param email
     * @param password
     * @returns
     */
    async login(email: string, password: string): Promise<User | null> {
      // Do login
      const body = {
        email,
        password,
      };

      this.callingCurrent = true;

      const userLogged = await lastValueFrom(
        request<{ user: U }>({
          url: this.loginUrl,
          method: 'POST',
          withCredentials: true,
          body,
        }).pipe(
          map((value) => value.response.user),
          map(
            (userInterface) => transformAndValidate(user)(userInterface) as U,
          ),
        ),
      );

      this.user = userLogged;
      this.callingCurrent = false;

      return this.user;
    }

    /**
     * Logout current user
     */
    async logout(): Promise<void> {
      this.user = null;
      this.callingCurrent = false;

      await lastValueFrom(
        request({
          url: this.logoutUrl,
          method: 'GET',
          withCredentials: true,
        }),
      );
    }

    /**
     * Returns the current users id
     * @returns get the current connected user id
     */
    async getCurrentUser(): Promise<string | null> {
      return ((await this.loggedIn()) && this.user?.id) || null;
    }

    /**
     * Denotes if the user is connected
     * @returns true if the user is connected false otherwise
     */
    async loggedIn(): Promise<boolean> {
      if (this.callingCurrent) {
        await new Promise((resolve, reject) => {
          setTimeout(() => reject(), 20000);

          this.userSubject.subscribe((selfUser) => {
            resolve(selfUser);
          });
        });
      }

      return this.user !== null;
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

  Injectable()(sessionService);

  return sessionService;
}
