import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

import { UserUpdateWithoutSharedTasksInput } from './user-update-without-shared-tasks.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateWithWhereUniqueWithoutSharedTasksInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

  @Field(() => UserUpdateWithoutSharedTasksInput, { nullable: false })
  @Type(() => UserUpdateWithoutSharedTasksInput)
  data!: UserUpdateWithoutSharedTasksInput;
}
