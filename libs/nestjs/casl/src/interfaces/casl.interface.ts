import { AnyAbility } from '@casl/ability';
import { PrismaAbility as CaslPrismaAbilities } from '@casl/prisma';
import { Prisma } from '@prisma/client';

import { CaslUser, CaslUserRoles, RolePermissions } from '@tractr/common';

export interface CaslOptions<
  R extends CaslUserRoles = CaslUserRoles,
  U extends CaslUser = { roles: R[] },
  A extends AnyAbility = AnyAbility,
> {
  rolePermissions: RolePermissions<R, U, A>;
}

export type PrismaAbility = CaslPrismaAbilities<
  [string, 'all' | Prisma.ModelName]
>;
