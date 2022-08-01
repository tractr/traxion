import { AbilityBuilder, AnyAbility } from '@casl/ability';
import { PrismaAbility as CaslPrismaAbilities } from '@casl/prisma';
import { Prisma, User, UserRoles } from '@prisma/client';

export interface CaslOptions<T extends AnyAbility = AnyAbility> {
  rolePermissions: Record<UserRoles, DefinePermissions<T>>;
}

export type PrismaAbility = CaslPrismaAbilities<
  [string, 'all' | Prisma.ModelName]
>;

export type DefinePermissions<T extends AnyAbility = AnyAbility> = (
  ability: AbilityBuilder<T>,
  user?: User,
) => void;
