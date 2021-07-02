import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

import { AuthentificationEnvironmentInterface } from '../authentification-for-root.interface';

import { User } from '@generated/models';
import { transformAndValidate } from '@generated/rext-client';

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
  private selfSubject = new Subject<User | null>();

  private selfValue: User | null = null;

  get self(): User | null {
    return this.selfValue;
  }

  set self(self: User | null) {
    this.selfValue = self;
    this.selfSubject.next(self);
  }

  /** Constructor */
  constructor(
    @Inject('environment')
    private environment: AuthentificationEnvironmentInterface,
  ) {
    this.sessionUrl = `${this.environment.api.url}/${this.environment.session.url}`;
    this.loginUrl = `${this.environment.api.url}/${this.environment.login.url}`;
    this.logoutUrl = `${this.environment.api.url}/${this.environment.logout.url}`;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.current();
  }

  /** Retrieve current session info from api */
  private async current(): Promise<User | null> {
    this.callingCurrent = true;
    this.self = await request({
      url: this.sessionUrl,
      method: 'GET',
      withCredentials: true,
    })
      .pipe(
        map((value: AjaxResponse) => value.response),
        map((userInterface) => {
          if (userInterface) {
            try {
              return transformAndValidate(User)(userInterface) as User;
            } catch (err: unknown) {
              console.error(
                "Return of session route can't be transformed in User",
                err,
              );
            }
          }

          return null;
        }),
      )
      .toPromise()
      .catch((err) => {
        this.handleLoginError(err);
        return null;
      });

    this.callingCurrent = false;

    return this.self;
  }

  /** Process a login */
  async login(email: string, password: string): Promise<User | null> {
    // Do login
    const body = {
      email,
      password,
    };

    this.callingCurrent = true;

    this.self = await request({
      url: this.loginUrl,
      method: 'POST',
      withCredentials: true,
      body,
    })
      .pipe(
        map((value: AjaxResponse) => value.response.user),
        map(
          (userInterface) => transformAndValidate(User)(userInterface) as User,
        ),
      )
      .toPromise()
      .catch((e) => {
        this.handleLoginError(e);
        return null;
      });

    this.callingCurrent = false;

    return this.self;
  }

  /** Logout current user */
  async logout(): Promise<void> {
    this.self = null;
    this.callingCurrent = false;

    await request({
      url: this.logoutUrl,
      method: 'GET',
      withCredentials: true,
    }).toPromise();
  }

  private handleLoginError(e: HttpErrorResponse): void {
    // Todo: Add error service
    // eslint-disable-next-line no-console
    console.log('todo: handle login error', e);
  }

  /** Returns the current users id */
  async getSelfId(): Promise<string | null> {
    return ((await this.loggedIn()) && this.self?.id) || null;
  }

  /** Denotes if the user is connected */
  async loggedIn(): Promise<boolean> {
    if (this.callingCurrent) {
      await new Promise((resolve) => {
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
