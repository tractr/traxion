import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AUTHENTICATION_OPTIONS, SESSION_SERVICE } from '../constants';
import { AuthenticationOptions } from '../dtos';
import { SessionService } from '../interfaces';

@Injectable()
export class IsNotLoggedGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(AUTHENTICATION_OPTIONS)
    private options: AuthenticationOptions,
    @Inject(SESSION_SERVICE)
    private sessionService: SessionService,
  ) {}

  canActivate(): Observable<UrlTree | boolean> {
    return this.sessionService.me$.pipe(
      map((user) => !!user),
      map((logged) => {
        if (logged) {
          return this.router.createUrlTree([
            ...this.options.routing.prefix,
            ...this.options.login.redirect,
          ]);
        }

        return true;
      }),
    );
  }
}
