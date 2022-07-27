import { AnyAbility } from '@casl/ability';
import { PrismaAbility as CaslPrismaAbilities } from '@casl/prisma';
import { Prisma } from '@prisma/client';

import { CaslRoles, CaslUser, RolePermissions } from '@tractr/common';

export interface CaslOptions<
  CustomRoles extends string = never,
  CustomUser extends CaslUser<CustomRoles> = CaslUser<CustomRoles>,
  CustomAbility extends AnyAbility = AnyAbility,
> {
  rolePermissions: RolePermissions<
    CaslRoles<CustomRoles>,
    CustomUser,
    CustomAbility
  >;
}

export type PrismaAbility = CaslPrismaAbilities<
  [string, 'all' | Prisma.ModelName]
>;
