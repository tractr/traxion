import { AbilityBuilder, AnyAbility, Subject } from '@casl/ability';
import { PrismaAbility } from '@casl/prisma';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CASL_MODULE_OPTIONS } from '../casl.constant';
import { CaslOptions } from '../interfaces';

import { CaslDefaultRoles, CaslRoles, CaslUser } from '@tractr/common';

@Injectable()
export class CaslAbilityFactoryService<
  CustomRoles extends string = never,
  CustomUser extends CaslUser<CustomRoles> = CaslUser<CustomRoles>,
  CustomAbility extends PrismaAbility = PrismaAbility,
> {
  constructor(
    @Inject(CASL_MODULE_OPTIONS)
    private readonly caslOptions: CaslOptions<CustomRoles, CustomUser>,
  ) {}

  createForUser(user?: CustomUser): CustomAbility {
    const builder = new AbilityBuilder(PrismaAbility);

    const { rolePermissions } = this.caslOptions;

    if (!user && rolePermissions[CaslDefaultRoles.guest]) {
      rolePermissions[CaslDefaultRoles.guest](builder);
      return builder.build() as CustomAbility;
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

    return builder.build() as CustomAbility;
  }
}
