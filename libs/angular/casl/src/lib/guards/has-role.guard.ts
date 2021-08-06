import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Prisma, User, UserRoles } from '@prisma/client';
import { map, Observable } from 'rxjs';

import {
  SESSION_SERVICE,
  SessionService,
} from '@tractr/angular-authentication';

export interface HasRoleData {
  redirectTo?: string;

  roles:
    | Prisma.Enumerable<UserRoles>
    | { every: Prisma.Enumerable<UserRoles>; some: never }
    | { some: Prisma.Enumerable<UserRoles>; every: never };
}

@Injectable()
export class HasRoleGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(SESSION_SERVICE)
    private sessionService: SessionService<User>,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<UrlTree | boolean> {
    return this.sessionService.me$.pipe(
      map((user) => {
        const { roles, redirectTo } = route.data as HasRoleData;

        if (!user) return this.redirectTo(state, redirectTo);
        if (!roles) return this.redirectTo(state, redirectTo);

        if (user.roles.includes(UserRoles.admin)) {
          this.sessionService.setPathAfterLogin(null);
          return true;
        }

        let every: UserRoles[] | undefined;
        let some: UserRoles[] | undefined;

        if (Array.isArray(roles) || typeof roles === 'string') {
          some = Array.isArray(roles) ? roles : [roles];
        } else if (typeof roles === 'object' && roles.every) {
          every = Array.isArray(roles.every)
            ? roles.every
            : ([roles.every] as UserRoles[]);
        } else if (typeof roles === 'object' && roles.some) {
          some = Array.isArray(roles.some)
            ? roles.some
            : ([roles.some] as UserRoles[]);
        }

        if (every && some)
          throw new Error('You cannot defined every and some at the same time');

        if (!every && !some)
          throw new Error(
            'You must defined at least one role to use this guard',
          );

        const hasRole = every
          ? every.every((value) => user.roles.includes(value))
          : some && some.some((value) => user.roles.includes(value));

        if (hasRole) {
          this.sessionService.setPathAfterLogin(null);
          return true;
        }

        return this.redirectTo(state, redirectTo);
      }),
    );
  }

  redirectTo(state: RouterStateSnapshot, redirectTo?: string) {
    this.sessionService.setPathAfterLogin(state);
    return this.router.createUrlTree([redirectTo]);
  }
}
