import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleCreateOrConnectWithoutRightsInput } from './role-create-or-connect-without-rights.input';
import { RoleCreateWithoutRightsInput } from './role-create-without-rights.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';

@InputType()
export class RoleCreateNestedManyWithoutRightsInput {
  @Field(() => [RoleCreateWithoutRightsInput], { nullable: true })
  @Type(() => RoleCreateWithoutRightsInput)
  create?: Array<RoleCreateWithoutRightsInput>;

  @Field(() => [RoleCreateOrConnectWithoutRightsInput], { nullable: true })
  @Type(() => RoleCreateOrConnectWithoutRightsInput)
  connectOrCreate?: Array<RoleCreateOrConnectWithoutRightsInput>;

  @Field(() => [RoleWhereUniqueInput], { nullable: true })
  @Type(() => RoleWhereUniqueInput)
  connect?: Array<RoleWhereUniqueInput>;
}
