import { AbilityBuilder, Subject } from '@casl/ability';
import { PrismaAbility } from '@casl/prisma';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CASL_MODULE_OPTIONS } from '../casl.constant';
import { CaslOptions } from '../interfaces';

import { CaslUser, CaslUserRoles } from '@tractr/common';

@Injectable()
export class CaslAbilityFactoryService {
  constructor(
    @Inject(CASL_MODULE_OPTIONS)
    private readonly caslOptions: CaslOptions,
  ) {}

  createForUser<
    U extends CaslUser,
    A extends PrismaAbility<[string, 'all' | Subject]>,
  >(user?: U): A {
    const builder = new AbilityBuilder<
      PrismaAbility<[string, 'all' | Prisma.ModelName]>
    >(PrismaAbility);

    const { rolePermissions } = this.caslOptions;

    if (!user && rolePermissions[CaslUserRoles.guest]) {
      rolePermissions[CaslUserRoles.guest](builder);
      return builder.build() as A;
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

    return builder.build() as A;
  }
}
