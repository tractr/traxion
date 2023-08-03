import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

import { UserCreateWithoutTasksInput } from './user-create-without-tasks.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutTasksInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

  @Field(() => UserCreateWithoutTasksInput, { nullable: false })
  @Type(() => UserCreateWithoutTasksInput)
  create!: UserCreateWithoutTasksInput;
}
