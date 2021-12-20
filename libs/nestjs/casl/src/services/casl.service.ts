import { AbilityBuilder } from '@casl/ability';
import { PrismaAbility } from '@casl/prisma';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { CASL_MODULE_OPTIONS } from '../casl.constant';
import { CaslOptions } from '../interfaces';

import { CaslUser, CaslUserRoles } from '@tractr/common';

@Injectable()
export class CaslAbilityFactoryService {
  constructor(
    @Inject(CASL_MODULE_OPTIONS)
    private readonly caslOptions: CaslOptions,
  ) {}

  createForUser<U extends CaslUser>(user?: U) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const AppAbility = PrismaAbility;
    const builder = new AbilityBuilder(AppAbility);

    const { rolePermissions } = this.caslOptions;

    if (!user && rolePermissions[CaslUserRoles.guest]) {
      rolePermissions[CaslUserRoles.guest](builder);
      return builder.build();
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    user.roles.forEach((role) => {
      if (!rolePermissions[role])
        return console.warn(`role ${role} has no app permission`);

      return rolePermissions[role](builder, user);
    });

    return builder.build();
  }
}
