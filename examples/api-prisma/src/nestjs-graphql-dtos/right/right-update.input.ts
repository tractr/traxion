import { Field, InputType } from '@nestjs/graphql';

import { RoleUpdateManyWithoutRightsNestedInput } from '../role/role-update-many-without-rights-nested.input';

@InputType()
export class RightUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => RoleUpdateManyWithoutRightsNestedInput, { nullable: true })
  roles?: RoleUpdateManyWithoutRightsNestedInput;
}
