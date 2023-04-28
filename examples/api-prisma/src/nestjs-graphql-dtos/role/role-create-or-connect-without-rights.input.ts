import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleCreateWithoutRightsInput } from './role-create-without-rights.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';

@InputType()
export class RoleCreateOrConnectWithoutRightsInput {
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  @Type(() => RoleWhereUniqueInput)
  where!: RoleWhereUniqueInput;

  @Field(() => RoleCreateWithoutRightsInput, { nullable: false })
  @Type(() => RoleCreateWithoutRightsInput)
  create!: RoleCreateWithoutRightsInput;
}
