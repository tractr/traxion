/* istanbul ignore file */
import { Subjects as CaslPrismaSubjects, PrismaAbility } from '@casl/prisma';
import { Prisma } from '@prisma/client';

import { RolePermissions } from '@tractr/common';

export type Roles = 'admin' | 'user' | 'guest';

export interface User extends Record<string, unknown> {
  id: string;
  roles: Roles[];
}

export type Subjects = CaslPrismaSubjects<
  Record<Prisma.ModelName, Record<string, unknown>> & {
    User: User;
  }
>;

export const Actions = {
  COUNT: 'count',
  CREATE: 'create',
  READ: 'read',
  SEARCH: 'search',
  UPDATE: 'update',
  REMOVE: 'remove',
  MANAGE: 'manage',
} as const;

export type Actions = typeof Actions[keyof typeof Actions];

export type AppAbility = PrismaAbility<[Actions, 'all' | Subjects]>;
export const AppAbility = PrismaAbility;

export const rolePermissions: RolePermissions<Roles, User, AppAbility> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  guest({ can }) {
    can('read', 'Tag');
  },
  user({ can }, user) {
    can('read', 'User', { id: user?.id });
  },
  admin({ can }) {
    can('manage', 'all');
  },
};
