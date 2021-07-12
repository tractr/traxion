import { Inject, Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { lastValueFrom, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AUTH_OPTIONS,
  AuthenticationOptionsInterface,
} from '../authentication.config';

import { User } from '@generated/models';
import { transformAndValidate } from '@generated/rext-client';
import { request } from '@tractr/angular-tools';

@Injectable()
export class SessionService {
  /** Route for login */
  private sessionUrl: string;

  /** Route for password login */
  private loginUrl: string;

  /** Route for password logout */
  private logoutUrl: string;

  /** Flag to denote if calling for current */
  private callingCurrent = false;

  /** Store the path to load after login */
  private pathAfterLogin: RouterStateSnapshot | null = null;

  /** Self */
  selfSubject = new Subject<User | null>();

  private selfValue: User | null = null;

  get self(): User | null {
    return this.selfValue;
  }

  set self(self: User | null) {
    this.selfValue = self;
    this.selfSubject.next(self);
  }
  /** /Self */

  /** Constructor */
  constructor(
    @Inject(AUTH_OPTIONS)
    private options: AuthenticationOptionsInterface,
  ) {
    this.sessionUrl = `${this.options.api.url}/${this.options.session.url}`;
    this.loginUrl = `${this.options.api.url}/${this.options.login.url}`;
    this.logoutUrl = `${this.options.api.url}/${this.options.logout.url}`;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.current();
  }

  /** Retrieve current session info from api */
  private async current(): Promise<User | null> {
    this.callingCurrent = true;

    try {
      const user = await lastValueFrom(
        request<User>({
          url: this.sessionUrl,
          method: 'GET',
          withCredentials: true,
        }).pipe(
          map((value) => value.response),
          map((userInterface) => {
            if (userInterface) {
              try {
                return transformAndValidate(User)(userInterface);
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

      this.self = user;
      this.callingCurrent = false;

      return this.self;
    } catch (err) {
      if (err && err.status === 401) {
        return null;
      }
      throw err;
    }
  }

  /** Process a login */
  async login(email: string, password: string): Promise<User | null> {
    // Do login
    const body = {
      email,
      password,
    };

    this.callingCurrent = true;

    const user = await lastValueFrom(
      request<{ user: User }>({
        url: this.loginUrl,
        method: 'POST',
        withCredentials: true,
        body,
      }).pipe(
        map((value) => value.response.user),
        map((userInterface) => transformAndValidate(User)(userInterface)),
      ),
    );

    this.self = user;
    this.callingCurrent = false;

    return this.self;
  }

  /** Logout current user */
  async logout(): Promise<void> {
    this.self = null;
    this.callingCurrent = false;

    await lastValueFrom(
      request({
        url: this.logoutUrl,
        method: 'GET',
        withCredentials: true,
      }),
    );
  }

  /** Returns the current users id */
  async getSelfId(): Promise<string | null> {
    return ((await this.loggedIn()) && this.self?.id) || null;
  }

  /** Denotes if the user is connected */
  async loggedIn(): Promise<boolean> {
    if (this.callingCurrent) {
      await new Promise((resolve, reject) => {
        setTimeout(() => reject(), 20000);

        this.selfSubject.subscribe((self) => {
          resolve(self);
        });
      });
    }

    return this.self !== null;
  }

  /** Define the path to load after login */
  setPathAfterLogin(route: RouterStateSnapshot | null) {
    this.pathAfterLogin = route;
  }

  /** Get the path to load after login and set it to null */
  popUrlAfterLogin(): string | undefined {
    if (!this.pathAfterLogin) {
      return undefined;
    }
    const { url } = this.pathAfterLogin;
    this.pathAfterLogin = null;
    return url;
  }
}
