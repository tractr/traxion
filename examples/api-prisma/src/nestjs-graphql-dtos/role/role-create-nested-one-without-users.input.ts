import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleCreateWithoutUsersInput } from './role-create-without-users.input';
import { HideField } from '@nestjs/graphql';
import { RoleCreateOrConnectWithoutUsersInput } from './role-create-or-connect-without-users.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { Type } from 'class-transformer';

@InputType()
export class RoleCreateNestedOneWithoutUsersInput {
  @HideField()
  create?: RoleCreateWithoutUsersInput;

  @HideField()
  connectOrCreate?: RoleCreateOrConnectWithoutUsersInput;

  @Field(() => RoleWhereUniqueInput, { nullable: true })
  @Type(() => RoleWhereUniqueInput)
  connect?: RoleWhereUniqueInput;
}
