import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

import { UserCreateWithoutSharedTasksInput } from './user-create-without-shared-tasks.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutSharedTasksInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

  @Field(() => UserCreateWithoutSharedTasksInput, { nullable: false })
  @Type(() => UserCreateWithoutSharedTasksInput)
  create!: UserCreateWithoutSharedTasksInput;
}
