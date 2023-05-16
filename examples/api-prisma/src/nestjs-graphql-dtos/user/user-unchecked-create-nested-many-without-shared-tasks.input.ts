import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutSharedTasksInput } from './user-create-without-shared-tasks.input';
import { HideField } from '@nestjs/graphql';
import { UserCreateOrConnectWithoutSharedTasksInput } from './user-create-or-connect-without-shared-tasks.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';

@InputType()
export class UserUncheckedCreateNestedManyWithoutSharedTasksInput {
  @HideField()
  create?: Array<UserCreateWithoutSharedTasksInput>;

  @HideField()
  connectOrCreate?: Array<UserCreateOrConnectWithoutSharedTasksInput>;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Array<UserWhereUniqueInput>;
}
