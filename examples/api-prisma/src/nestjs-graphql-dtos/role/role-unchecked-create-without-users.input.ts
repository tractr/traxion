import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

import { RightUncheckedCreateNestedManyWithoutRolesInput } from '../right/right-unchecked-create-nested-many-without-roles.input';

@InputType()
export class RoleUncheckedCreateWithoutUsersInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => RightUncheckedCreateNestedManyWithoutRolesInput, {
    nullable: true,
  })
  rights?: RightUncheckedCreateNestedManyWithoutRolesInput;
}
