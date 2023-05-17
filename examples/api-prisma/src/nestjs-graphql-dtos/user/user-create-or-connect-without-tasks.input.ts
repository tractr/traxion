import { Field , InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutTasksInput } from './user-create-without-tasks.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutTasksInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: UserWhereUniqueInput;

  @Field(() => UserCreateWithoutTasksInput, { nullable: false })
  @Type(() => UserCreateWithoutTasksInput)
  create!: UserCreateWithoutTasksInput;
}
