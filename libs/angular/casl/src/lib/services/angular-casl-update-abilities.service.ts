import { Inject, Injectable } from '@angular/core';
import { Ability, AbilityBuilder } from '@casl/ability';
import { catchError, of, takeUntil } from 'rxjs';

import { CASL_MODULE_OPTIONS } from '../constants';
import { CaslOptions, UserMin } from '../interfaces';

import {
  SESSION_SERVICE,
  SessionService,
} from '@tractr/angular-authentication';
import { Unsubscriber } from '@tractr/angular-tools';
import { CaslUserRoles } from '@tractr/common';

@Injectable()
export class CaslUpdateAbilitiesService extends Unsubscriber {
  constructor(
    @Inject(CASL_MODULE_OPTIONS)
    private caslOptions: CaslOptions,
    @Inject(SESSION_SERVICE)
    private sessionService: SessionService<UserMin>,
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

  updateAbility(user: UserMin | null): void {
    if (user === null) {
      this.ability.update([]);
      return;
    }

    this.ability.update(this.createRulesForUser(user));
  }

  createRulesForUser<U extends UserMin>(user: U) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const builder = new AbilityBuilder(Ability);

    const { rolePermissions } = this.caslOptions;

    if (!user && rolePermissions[CaslUserRoles.guest]) {
      rolePermissions[CaslUserRoles.guest](builder);
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
