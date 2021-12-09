/* eslint-disable @typescript-eslint/ban-types */
import { Subjects as CaslPrismaSubjects, PrismaAbility } from '@casl/prisma';
import { Controller, Get } from '@nestjs/common';

import { RolePermissions } from '@tractr/common';
import { Policies } from '@tractr/nestjs-core';

export type Roles = 'admin' | 'user' | 'guest';

export interface User extends Record<string, unknown> {
  id: string;
  roles: Roles[];
}

export type Subjects = CaslPrismaSubjects<{
  Answer: {};
  Message: {};
  OpenQuestion: {};
  Question: {};
  Tag: {};
  User: User;
  Variable: {};
  InternalField: {};
  all: 'all';
}>;

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

export type AppAbility = PrismaAbility<[Actions, Subjects]>;
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

@Controller()
export class CaslEndPointMock {
  @Get('/read-user')
  @Policies((ability: AppAbility) => ability.can('read', 'User'))
  noGuest(): string {
    return 'never';
  }

  @Get('/read-admin')
  @Policies((ability: AppAbility) => ability.can('update', 'User'))
  onlyAdmin(): string {
    return 'never';
  }

  @Get('/read-guest')
  @Policies((ability: AppAbility) => ability.can('read', 'Tag'))
  needToBeGuest(): string {
    return 'never';
  }
}
