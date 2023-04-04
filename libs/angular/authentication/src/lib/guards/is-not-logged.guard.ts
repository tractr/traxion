import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AUTHENTICATION_OPTIONS } from '../constants';
import { SessionService } from '../services';
import { AuthenticationModuleOptions } from '../types';

export function isNotLoggedGuard() {
  return () => {
    const router = inject(Router);
    const sessionService = inject(SessionService);
    const options = inject<AuthenticationModuleOptions>(AUTHENTICATION_OPTIONS);
    const logged = sessionService.isLogged();

    if (logged) {
      return router.createUrlTree([options.redirect.login]);
    }

    return true;
  };
}
