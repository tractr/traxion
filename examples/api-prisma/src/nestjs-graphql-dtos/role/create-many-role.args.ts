import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleCreateManyInput } from './role-create-many.input';

@ArgsType()
export class CreateManyRoleArgs {
  @Field(() => [RoleCreateManyInput], { nullable: false })
  @Type(() => RoleCreateManyInput)
  data!: Array<RoleCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
