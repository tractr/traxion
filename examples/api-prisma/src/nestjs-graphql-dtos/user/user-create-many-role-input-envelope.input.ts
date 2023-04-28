import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateManyRoleInput } from './user-create-many-role.input';

@InputType()
export class UserCreateManyRoleInputEnvelope {
  @Field(() => [UserCreateManyRoleInput], { nullable: false })
  @Type(() => UserCreateManyRoleInput)
  data!: Array<UserCreateManyRoleInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
