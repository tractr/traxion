import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutTasksInput } from './user-create-without-tasks.input';
import { HideField } from '@nestjs/graphql';
import { UserCreateOrConnectWithoutTasksInput } from './user-create-or-connect-without-tasks.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';

@InputType()
export class UserCreateNestedOneWithoutTasksInput {
  @HideField()
  create?: UserCreateWithoutTasksInput;

  @HideField()
  connectOrCreate?: UserCreateOrConnectWithoutTasksInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: UserWhereUniqueInput;
}
