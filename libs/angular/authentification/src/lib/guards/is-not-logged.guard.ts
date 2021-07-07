import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import {
  AuthentificationForRootEnum,
  AuthentificationOptionsInterface,
} from '../authentification-for-root.interface';
import { SessionService } from '../services/session.service';

@Injectable()
export class IsNotLoggedGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    @Inject(AuthentificationForRootEnum.options)
    private options: AuthentificationOptionsInterface,
  ) {}

  async canActivate(): Promise<UrlTree | boolean> {
    if (await this.sessionService.loggedIn()) {
      return this.router.createUrlTree([
        ...this.options.routing.prefix,
        this.options.login.routing,
      ]);
    }
    return true;
  }
}
