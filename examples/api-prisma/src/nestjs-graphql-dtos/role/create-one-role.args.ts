import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleCreateInput } from './role-create.input';

@ArgsType()
export class CreateOneRoleArgs {
  @Field(() => RoleCreateInput, { nullable: false })
  @Type(() => RoleCreateInput)
  data!: RoleCreateInput;
}
