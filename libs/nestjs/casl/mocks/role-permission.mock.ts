/* istanbul ignore file */
import { Subjects as CaslPrismaSubjects, PrismaAbility } from '@casl/prisma';
import { Prisma, UserRoles } from '@prisma/client';

import { DefinePermissions } from '../src';

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

export const rolePermissions: Record<
  UserRoles,
  DefinePermissions<AppAbility>
> = {
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  custom({ can }, user) {},
};
