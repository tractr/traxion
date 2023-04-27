import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

import { RightCreateNestedManyWithoutRolesInput } from '../right/right-create-nested-many-without-roles.input';
import { UserCreateNestedManyWithoutRoleInput } from '../user/user-create-nested-many-without-role.input';

@InputType()
export class RoleCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => UserCreateNestedManyWithoutRoleInput, { nullable: true })
  users?: UserCreateNestedManyWithoutRoleInput;

  @Field(() => RightCreateNestedManyWithoutRolesInput, { nullable: true })
  rights?: RightCreateNestedManyWithoutRolesInput;
}
