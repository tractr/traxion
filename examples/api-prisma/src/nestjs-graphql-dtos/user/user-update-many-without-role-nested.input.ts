import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutRoleInput } from './user-create-without-role.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutRoleInput } from './user-create-or-connect-without-role.input';
import { UserUpsertWithWhereUniqueWithoutRoleInput } from './user-upsert-with-where-unique-without-role.input';
import { UserCreateManyRoleInputEnvelope } from './user-create-many-role-input-envelope.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithWhereUniqueWithoutRoleInput } from './user-update-with-where-unique-without-role.input';
import { UserUpdateManyWithWhereWithoutRoleInput } from './user-update-many-with-where-without-role.input';
import { UserScalarWhereInput } from './user-scalar-where.input';

@InputType()
export class UserUpdateManyWithoutRoleNestedInput {
  @Field(() => [UserCreateWithoutRoleInput], { nullable: true })
  @Type(() => UserCreateWithoutRoleInput)
  create?: Array<UserCreateWithoutRoleInput>;

  @Field(() => [UserCreateOrConnectWithoutRoleInput], { nullable: true })
  @Type(() => UserCreateOrConnectWithoutRoleInput)
  connectOrCreate?: Array<UserCreateOrConnectWithoutRoleInput>;

  @Field(() => [UserUpsertWithWhereUniqueWithoutRoleInput], { nullable: true })
  @Type(() => UserUpsertWithWhereUniqueWithoutRoleInput)
  upsert?: Array<UserUpsertWithWhereUniqueWithoutRoleInput>;

  @Field(() => UserCreateManyRoleInputEnvelope, { nullable: true })
  @Type(() => UserCreateManyRoleInputEnvelope)
  createMany?: UserCreateManyRoleInputEnvelope;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  set?: Array<UserWhereUniqueInput>;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  disconnect?: Array<UserWhereUniqueInput>;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  delete?: Array<UserWhereUniqueInput>;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Array<UserWhereUniqueInput>;

  @Field(() => [UserUpdateWithWhereUniqueWithoutRoleInput], { nullable: true })
  @Type(() => UserUpdateWithWhereUniqueWithoutRoleInput)
  update?: Array<UserUpdateWithWhereUniqueWithoutRoleInput>;

  @Field(() => [UserUpdateManyWithWhereWithoutRoleInput], { nullable: true })
  @Type(() => UserUpdateManyWithWhereWithoutRoleInput)
  updateMany?: Array<UserUpdateManyWithWhereWithoutRoleInput>;

  @Field(() => [UserScalarWhereInput], { nullable: true })
  @Type(() => UserScalarWhereInput)
  deleteMany?: Array<UserScalarWhereInput>;
}
