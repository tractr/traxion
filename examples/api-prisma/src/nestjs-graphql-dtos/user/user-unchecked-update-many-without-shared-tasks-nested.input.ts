import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutSharedTasksInput } from './user-create-without-shared-tasks.input';
import { HideField } from '@nestjs/graphql';
import { UserCreateOrConnectWithoutSharedTasksInput } from './user-create-or-connect-without-shared-tasks.input';
import { UserUpsertWithWhereUniqueWithoutSharedTasksInput } from './user-upsert-with-where-unique-without-shared-tasks.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserUpdateWithWhereUniqueWithoutSharedTasksInput } from './user-update-with-where-unique-without-shared-tasks.input';
import { UserUpdateManyWithWhereWithoutSharedTasksInput } from './user-update-many-with-where-without-shared-tasks.input';
import { UserScalarWhereInput } from './user-scalar-where.input';

@InputType()
export class UserUncheckedUpdateManyWithoutSharedTasksNestedInput {
  @HideField()
  create?: Array<UserCreateWithoutSharedTasksInput>;

  @HideField()
  connectOrCreate?: Array<UserCreateOrConnectWithoutSharedTasksInput>;

  @HideField()
  upsert?: Array<UserUpsertWithWhereUniqueWithoutSharedTasksInput>;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  set?: Array<UserWhereUniqueInput>;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  disconnect?: Array<UserWhereUniqueInput>;

  @HideField()
  delete?: Array<UserWhereUniqueInput>;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Array<UserWhereUniqueInput>;

  @HideField()
  update?: Array<UserUpdateWithWhereUniqueWithoutSharedTasksInput>;

  @HideField()
  updateMany?: Array<UserUpdateManyWithWhereWithoutSharedTasksInput>;

  @HideField()
  deleteMany?: Array<UserScalarWhereInput>;
}
