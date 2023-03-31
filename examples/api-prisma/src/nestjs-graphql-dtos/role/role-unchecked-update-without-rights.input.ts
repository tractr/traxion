import { Field, InputType, Int } from '@nestjs/graphql';

import { UserUncheckedUpdateManyWithoutRoleNestedInput } from '../user/user-unchecked-update-many-without-role-nested.input';

@InputType()
export class RoleUncheckedUpdateWithoutRightsInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => UserUncheckedUpdateManyWithoutRoleNestedInput, {
    nullable: true,
  })
  users?: UserUncheckedUpdateManyWithoutRoleNestedInput;
}
