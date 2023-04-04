import { Inject, Injectable } from '@angular/core';
import { Ability, AbilityBuilder } from '@casl/ability';
import type { User } from '@prisma/client';
import { catchError, of, takeUntil } from 'rxjs';

import { CASL_MODULE_OPTIONS } from '../constants';
import { CaslOptions } from '../interfaces';

import { SessionService } from '@trxn/angular-authentication';
import { Unsubscribe } from '@trxn/angular-tools';

@Injectable()
export class CaslUpdateAbilitiesService extends Unsubscribe {
  constructor(
    @Inject(CASL_MODULE_OPTIONS)
    private caslOptions: CaslOptions,
    private sessionService: SessionService<User>,
    private ability: Ability,
  ) {
    super();
  }

  onInit() {
    this.sessionService.me$
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(() => of(null)),
      )
      .subscribe((user) => this.updateAbility(user));
  }

  updateAbility(user: User | null): void {
    if (user === null) {
      this.ability.update([]);
      return;
    }

    this.ability.update(this.createRulesForUser(user));
  }

  createRulesForUser(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const builder = new AbilityBuilder(Ability);

    const { rolePermissions } = this.caslOptions;

    if (!user && rolePermissions.guest) {
      rolePermissions.guest(builder);
      return builder.rules;
    }

    if (!user) {
      return builder.rules;
    }

    user.roles.forEach((role) => {
      if (!rolePermissions[role])
        return console.warn(`role ${role} has no app permission`);

      return rolePermissions[role](builder, user);
    });

    return builder.rules;
  }
}
