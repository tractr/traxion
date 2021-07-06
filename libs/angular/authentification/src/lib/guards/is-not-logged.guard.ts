import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { AuthentificationEnvironmentInterface } from '../authentification-for-root.interface';
import { SessionService } from '../services/session.service';

@Injectable()
export class IsNotLoggedGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    @Inject('environment')
    private environment: AuthentificationEnvironmentInterface,
  ) {}

  async canActivate(): Promise<UrlTree | boolean> {
    if (await this.sessionService.loggedIn()) {
      return this.router.createUrlTree([
        ...this.environment.routing.prefix,
        this.environment.login.routing,
      ]);
    }
    return true;
  }
}
