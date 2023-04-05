import { Field, InputType } from '@nestjs/graphql';

import { RightUpdateManyWithoutRolesNestedInput } from '../right/right-update-many-without-roles-nested.input';
import { UserUpdateManyWithoutRoleNestedInput } from '../user/user-update-many-without-role-nested.input';

@InputType()
export class RoleUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => UserUpdateManyWithoutRoleNestedInput, { nullable: true })
  users?: UserUpdateManyWithoutRoleNestedInput;

  @Field(() => RightUpdateManyWithoutRolesNestedInput, { nullable: true })
  rights?: RightUpdateManyWithoutRolesNestedInput;
}
