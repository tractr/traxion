import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AuthentificationEnvironmentInterface } from '../authentification-for-root.interface';
import { SessionService } from '../services/session.service';

@Injectable()
export class IsLoggedGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    @Inject('environment')
    private environment: AuthentificationEnvironmentInterface,
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
      ...this.environment.routing.prefix,
      'sign-in',
    ]);
  }
}
