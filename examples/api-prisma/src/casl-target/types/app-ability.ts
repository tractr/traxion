import { PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects } from '@casl/prisma';
import { Profile, Right, Role, User } from '@prisma/client';

import { Action } from '@trxn/nestjs-casl';

export type ModelSubjects = {
  User: User;
  Role: Role;
  Right: Right;
  Profile: Profile;
};

export type AppSubjects = 'all' | Subjects<ModelSubjects>;

export type AppAbility = PureAbility<[Action, AppSubjects], PrismaQuery>;
