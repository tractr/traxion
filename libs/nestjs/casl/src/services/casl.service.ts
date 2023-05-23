import { AbilityBuilder } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { MODULE_OPTIONS_TOKEN } from '../casl.module-definition';
import { UntypedCaslModuleOptions } from '../interfaces';

import { User } from '@trxn/nestjs-user';

@Injectable()
export class CaslAbilityFactoryService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly caslOptions: UntypedCaslModuleOptions,
  ) {}

  getRoles(user: Record<string, unknown>) {
    const roles = this.caslOptions.getRoles(user);
    return Array.isArray(roles) ? roles : [roles];
  }

  createForUser<U extends User>(user?: U) {
    const builder = new AbilityBuilder(createPrismaAbility);

    const { rolePermissions, publicPermissions } = this.caslOptions;

    if (!user && publicPermissions) {
      publicPermissions(builder);
      return builder.build();
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    const roles = this.getRoles(user);

    let hasSomeRole = false;
    for (const role of roles) {
      if (rolePermissions[role]) {
        hasSomeRole = true;
        rolePermissions[role](builder, user);
      }
    }

    // If the user has no role, they cannot do anything.
    if (!hasSomeRole) {
      builder.cannot('manage', 'all');
    }

    return builder.build();
  }
}
