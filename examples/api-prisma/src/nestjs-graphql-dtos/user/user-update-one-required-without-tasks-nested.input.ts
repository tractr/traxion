import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutTasksInput } from './user-create-without-tasks.input';
import { HideField } from '@nestjs/graphql';
import { UserCreateOrConnectWithoutTasksInput } from './user-create-or-connect-without-tasks.input';
import { UserUpsertWithoutTasksInput } from './user-upsert-without-tasks.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutTasksInput } from './user-update-without-tasks.input';

@InputType()
export class UserUpdateOneRequiredWithoutTasksNestedInput {
  @HideField()
  create?: UserCreateWithoutTasksInput;

  @HideField()
  connectOrCreate?: UserCreateOrConnectWithoutTasksInput;

  @HideField()
  upsert?: UserUpsertWithoutTasksInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: UserWhereUniqueInput;

  @HideField()
  update?: UserUpdateWithoutTasksInput;
}
