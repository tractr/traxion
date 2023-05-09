import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { Type } from 'class-transformer';
import { RoleCreateWithoutUsersInput } from './role-create-without-users.input';

@InputType()
export class RoleCreateOrConnectWithoutUsersInput {
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  @Type(() => RoleWhereUniqueInput)
  where!: RoleWhereUniqueInput;

  @Field(() => RoleCreateWithoutUsersInput, { nullable: false })
  @Type(() => RoleCreateWithoutUsersInput)
  create!: RoleCreateWithoutUsersInput;
}
