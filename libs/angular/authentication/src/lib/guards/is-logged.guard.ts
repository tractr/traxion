import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import {
  AUTH_OPTIONS,
  AuthenticationOptionsInterface,
} from '../authentication.config';
import { SessionService } from '../services/session.service';

@Injectable()
export class IsLoggedGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    @Inject(AUTH_OPTIONS)
    private options: AuthenticationOptionsInterface,
  ) {}

  async canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<UrlTree | boolean> {
    if (await this.sessionService.loggedIn()) {
      this.sessionService.setPathAfterLogin(null);
      return true;
    }

    this.sessionService.setPathAfterLogin(state);
    return this.router.createUrlTree([
      ...this.options.routing.prefix,
      'sign-in',
    ]);
  }
}
