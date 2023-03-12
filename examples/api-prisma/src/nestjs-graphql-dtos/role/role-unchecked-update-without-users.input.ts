import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { RightUncheckedUpdateManyWithoutRolesNestedInput } from '../right/right-unchecked-update-many-without-roles-nested.input';

@InputType()
export class RoleUncheckedUpdateWithoutUsersInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => RightUncheckedUpdateManyWithoutRolesNestedInput, {
    nullable: true,
  })
  rights?: RightUncheckedUpdateManyWithoutRolesNestedInput;
}
