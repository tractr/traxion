import { AbilityBuilder, Subject } from '@casl/ability';
import { PrismaAbility } from '@casl/prisma';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Prisma, User } from '@prisma/client';

import { CASL_MODULE_OPTIONS } from '../casl.constant';
import { CaslOptions } from '../interfaces';

@Injectable()
export class CaslAbilityFactoryService {
  constructor(
    @Inject(CASL_MODULE_OPTIONS)
    private readonly caslOptions: CaslOptions,
  ) {}

  createForUser(user?: User): PrismaAbility<[string, 'all' | Subject]> {
    const builder = new AbilityBuilder<
      PrismaAbility<[string, 'all' | Prisma.ModelName]>
    >(PrismaAbility);

    const { rolePermissions } = this.caslOptions;

    if (!user && rolePermissions.guest) {
      rolePermissions.guest(builder, user);
      return builder.build();
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    user.roles.forEach((role) => {
      if (!rolePermissions[role]) return;
      rolePermissions[role](builder, user);
    });

    if (
      user.roles.some((role) => typeof rolePermissions[role] === 'undefined')
    ) {
      builder.cannot('manage', 'all');
    }

    return builder.build();
  }
}
