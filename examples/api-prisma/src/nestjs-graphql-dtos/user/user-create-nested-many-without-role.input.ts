import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutRoleInput } from './user-create-without-role.input';
import { HideField } from '@nestjs/graphql';
import { UserCreateOrConnectWithoutRoleInput } from './user-create-or-connect-without-role.input';
import { UserCreateManyRoleInputEnvelope } from './user-create-many-role-input-envelope.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';

@InputType()
export class UserCreateNestedManyWithoutRoleInput {
  @HideField()
  create?: Array<UserCreateWithoutRoleInput>;

  @HideField()
  connectOrCreate?: Array<UserCreateOrConnectWithoutRoleInput>;

  @HideField()
  createMany?: UserCreateManyRoleInputEnvelope;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Array<UserWhereUniqueInput>;
}
