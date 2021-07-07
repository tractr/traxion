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
  Variable,
} from '@prisma/client';

export type AppAbility = PrismaAbility<
  [
    string,
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
    // const AppAbility = PrismaAbility as AbilityClass<AppAbility>;
    // const { can, cannot, build } = new AbilityBuilder(AppAbility);
    // const ability = build();
    // if (user.id === 'admin') {
    //   can('manage', 'User', 'all'); // read-write access to everything
    // } else {
    //   can('read', 'User', { id: user.id }); // read-only access to everything
    // }
    // can(Action.Update, Article, { authorId: user.id });
    // cannot(Action.Delete, Article, { isPublished: true });
    // return build({
    //   // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
    //   detectSubjectType: (item) =>
    //     item.constructor as ExtractSubjectType<Subjects>,
    // });
  }
}
