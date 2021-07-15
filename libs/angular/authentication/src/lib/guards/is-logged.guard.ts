import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';

import {
  AUTH_OPTIONS,
  AuthenticationOptions,
  SESSION_SERVICE,
} from '../authentication.config';
import { SessionService } from '../interfaces';

@Injectable()
export class IsLoggedGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(AUTH_OPTIONS)
    private options: AuthenticationOptions,
    @Inject(SESSION_SERVICE)
    private sessionService: SessionService,
  ) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<UrlTree | boolean> {
    return this.sessionService.me$.pipe(
      map((user) => !!user),
      map((logged) => {
        if (logged) {
          this.sessionService.setPathAfterLogin(null);
          return true;
        }

        this.sessionService.setPathAfterLogin(state);
        return this.router.createUrlTree([
          ...this.options.routing.prefix,
          this.options.login.routing,
        ]);
      }),
    );
  }
}
