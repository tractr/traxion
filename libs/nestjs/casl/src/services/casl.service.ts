import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import {
  Answer,
  Message,
  OpenQuestion,
  Question,
  Tag,
  User,
  UserRoles,
  Variable,
} from '@prisma/client';

type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';

export type AppAbility = PrismaAbility<
  [
    Actions,
    Subjects<{
      User: User;
      Answer: Answer;
      Message: Message;
      OpenQuestion: OpenQuestion;
      Question: Question;
      Tag: Tag;
      Variable: Variable;
    }>,
  ]
>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const AppAbility = PrismaAbility as AbilityClass<AppAbility>;
    const { can, cannot, build } = new AbilityBuilder(AppAbility);
    const ability = build();

    can('manage', 'User', { roles: { in: [UserRoles.admin] } });

    if (user.roles.includes('admin')) {
      can('manage', 'User', 'all');
    } else {
      // can(Abilities., 'User', { id: user.id });
      can('', 'User', { id: user.id });
      can('read', 'User', { id: user.id });
      can('read', 'User', { id: user.id });
    }
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
