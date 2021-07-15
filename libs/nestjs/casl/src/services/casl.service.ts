import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { PrismaAbility } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { UserRoles } from '@prisma/client';

import {
  Answer,
  Message,
  OpenQuestion,
  Question,
  Tag,
  User,
  Variable,
} from '@generated/models';

type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Answer
      | typeof Message
      | typeof OpenQuestion
      | typeof Question
      | typeof Tag
      | typeof Variable
    >
  | 'all';
type Actions = 'count' | 'create' | 'read' | 'update' | 'delete' | 'manage';

export type AppAbility = PrismaAbility<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const AppAbility = PrismaAbility as AbilityClass<AppAbility>;
    const { can, build } = new AbilityBuilder(AppAbility);

    if (user) {
      // user is connected
      if (user.roles.includes(UserRoles.admin)) {
      }
    } else {
      // user is guest
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
