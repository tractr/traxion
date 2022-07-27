import {
  AppAbility,
  AppRoles,
  rolePermissions as baseRolePermission,
  UserWithIds,
} from './generated/casl';

import { RolePermissions } from '@tractr/common';

export const rolePermissions: RolePermissions<
  AppRoles,
  UserWithIds,
  AppAbility
> = {
  ...baseRolePermission,
  director({ can }, user) {
    can('read', 'User');
  },
};
