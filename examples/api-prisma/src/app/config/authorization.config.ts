import { AbilityBuilder } from '@casl/ability';
import { Prisma } from '@prisma/client';

import { UserSelectOwnershipIds as userSelect } from '../../casl/constants';
import { AppAbility } from '../../casl/types';
import { userOwnershipPermission } from '../../casl/user-default-permissions';

import {
  Action,
  DefinePermissions,
  DefinePublicPermissions,
} from '@trxn/nestjs-casl';

export type Roles = 'admin' | 'user';

export const customSelect = Prisma.validator<Prisma.UserArgs>()({
  select: {
    ...userSelect.select,
    role: {
      select: {
        ...userSelect.select.role.select,
        name: true,
      },
    },
  },
});

export type UserWithOwnershipIds = Prisma.UserGetPayload<typeof customSelect>;

export const rolePermissions: Record<
  Roles,
  DefinePermissions<AbilityBuilder<AppAbility>, UserWithOwnershipIds>
> = {
  user: (abilities, user) => {
    userOwnershipPermission(abilities, user);
  },
  admin: (abilities) => {
    abilities.can(Action.Manage, 'all');
  },
};

export const publicPermissions: DefinePublicPermissions<
  AbilityBuilder<AppAbility>
> = () => {
  // Public has not right
};
