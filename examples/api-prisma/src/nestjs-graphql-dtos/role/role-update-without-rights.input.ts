import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

import { UserUpdateManyWithoutRoleNestedInput } from '../user/user-update-many-without-role-nested.input';

@InputType()
export class RoleUpdateWithoutRightsInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => UserUpdateManyWithoutRoleNestedInput, { nullable: true })
  users?: UserUpdateManyWithoutRoleNestedInput;
}
