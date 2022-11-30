import { UserRoles } from '@prisma/client';

import {
  AppAbility,
  rolePermissions as baseRolePermission,
} from './generated/casl';

import { DefinePermissions } from '@trxn/nestjs-casl';

export const rolePermissions: Record<
  UserRoles,
  DefinePermissions<AppAbility>
> = {
  ...baseRolePermission,
  custom({ can }) {
    can('read', 'User');
  },
};
