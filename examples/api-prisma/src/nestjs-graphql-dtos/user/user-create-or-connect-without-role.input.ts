import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutRoleInput } from './user-create-without-role.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutRoleInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: UserWhereUniqueInput;

  @Field(() => UserCreateWithoutRoleInput, { nullable: false })
  @Type(() => UserCreateWithoutRoleInput)
  create!: UserCreateWithoutRoleInput;
}
