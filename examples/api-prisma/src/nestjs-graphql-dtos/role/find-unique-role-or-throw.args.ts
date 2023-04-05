import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleWhereUniqueInput } from './role-where-unique.input';

@ArgsType()
export class FindUniqueRoleOrThrowArgs {
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  @Type(() => RoleWhereUniqueInput)
  where!: RoleWhereUniqueInput;
}
