import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleCreateOrConnectWithoutUsersInput } from './role-create-or-connect-without-users.input';
import { RoleCreateWithoutUsersInput } from './role-create-without-users.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';

@InputType()
export class RoleCreateNestedOneWithoutUsersInput {
  @Field(() => RoleCreateWithoutUsersInput, { nullable: true })
  @Type(() => RoleCreateWithoutUsersInput)
  create?: RoleCreateWithoutUsersInput;

  @Field(() => RoleCreateOrConnectWithoutUsersInput, { nullable: true })
  @Type(() => RoleCreateOrConnectWithoutUsersInput)
  connectOrCreate?: RoleCreateOrConnectWithoutUsersInput;

  @Field(() => RoleWhereUniqueInput, { nullable: true })
  @Type(() => RoleWhereUniqueInput)
  connect?: RoleWhereUniqueInput;
}
