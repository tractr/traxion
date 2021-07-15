import { AbilityBuilder } from '@casl/ability';
import { PrismaAbility } from '@casl/prisma';
import { Inject, Injectable } from '@nestjs/common';

import { CASL_MODULE_OPTIONS } from '../casl.constant';
import { CaslOptions, CaslUser } from '../interfaces';

@Injectable()
export class CaslAbilityFactoryService {
  constructor(
    @Inject(CASL_MODULE_OPTIONS)
    private readonly caslOptions: CaslOptions,
  ) {}

  createForUser<U extends CaslUser>(user: U) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const AppAbility = PrismaAbility;
    const builder = new AbilityBuilder(AppAbility);

    const { rolePermissions } = this.caslOptions;

    user.roles.forEach((role) => {
      if (!rolePermissions[role])
        return console.warn(`role ${role} has no app permission`);

      return rolePermissions[role](user, builder);
    });

    return builder.build();
  }
}
