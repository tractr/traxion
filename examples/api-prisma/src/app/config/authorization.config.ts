import { AbilityBuilder } from '@casl/ability';
import { Prisma, Role } from '@prisma/client';

import { UserSelectOwnershipIds as userSelect } from '../../casl/constants';
import { AppAbility } from '../../casl/types';
import { userOwnershipPermission } from '../../casl/user-default-permissions';

import {
  Action,
  DefinePermissions,
  DefinePublicPermissions,
} from '@trxn/nestjs-casl';

export const userSelectWithOwnership = Prisma.validator<Prisma.UserArgs>()({
  select: {
    ...userSelect.select,
    roles: true,
  },
});

export type UserWithOwnershipIds = Prisma.UserGetPayload<
  typeof userSelectWithOwnership
>;

export const customSelect = userSelectWithOwnership.select;

export const rolePermissions: Record<
  Role,
  DefinePermissions<AbilityBuilder<AppAbility>, UserWithOwnershipIds>
> = {
  USER: (abilities, user) => {
    userOwnershipPermission(abilities, user);
  },
  ADMIN: (abilities) => {
    abilities.can(Action.Manage, 'all');
  },
};

export const publicPermissions: DefinePublicPermissions<
  AbilityBuilder<AppAbility>
> = () => {
  // Public has not right
};
