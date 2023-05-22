import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutSharedTasksInput } from './user-create-without-shared-tasks.input';
import { UserUpdateWithoutSharedTasksInput } from './user-update-without-shared-tasks.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpsertWithWhereUniqueWithoutSharedTasksInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: UserWhereUniqueInput;

  @Field(() => UserUpdateWithoutSharedTasksInput, { nullable: false })
  @Type(() => UserUpdateWithoutSharedTasksInput)
  update!: UserUpdateWithoutSharedTasksInput;

  @Field(() => UserCreateWithoutSharedTasksInput, { nullable: false })
  @Type(() => UserCreateWithoutSharedTasksInput)
  create!: UserCreateWithoutSharedTasksInput;
}
