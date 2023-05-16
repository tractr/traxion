import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutSharedTasksInput } from './user-update-without-shared-tasks.input';
import { UserCreateWithoutSharedTasksInput } from './user-create-without-shared-tasks.input';

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
