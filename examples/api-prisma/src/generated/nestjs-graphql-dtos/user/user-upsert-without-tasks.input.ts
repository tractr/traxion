import { Field , InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutTasksInput } from './user-create-without-tasks.input';
import { UserUpdateWithoutTasksInput } from './user-update-without-tasks.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutTasksInput {
  @Field(() => UserUpdateWithoutTasksInput, { nullable: false })
  @Type(() => UserUpdateWithoutTasksInput)
  update!: UserUpdateWithoutTasksInput;

  @Field(() => UserCreateWithoutTasksInput, { nullable: false })
  @Type(() => UserCreateWithoutTasksInput)
  create!: UserCreateWithoutTasksInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
