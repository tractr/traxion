import { AbilityBuilder } from '@casl/ability';

import {
  AppAbility,
  userOwnershipPermission,
  UserSelectOwnershipIds,
  UserWithOwnershipIds,
} from '../../casl';

import {
  Action,
  DefinePermissions,
  DefinePublicPermissions,
} from '@trxn/nestjs-casl';

export const customSelect = UserSelectOwnershipIds.select;

export const rolePermissions: Record<
  string,
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

export function getRoles(user: UserWithOwnershipIds) {
  return user.roles;
}
