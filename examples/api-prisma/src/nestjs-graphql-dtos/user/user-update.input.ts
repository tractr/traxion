import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleUpdateOneRequiredWithoutUsersNestedInput } from '../role/role-update-one-required-without-users-nested.input';
import { ProfileUpdateOneWithoutUserNestedInput } from '../profile/profile-update-one-without-user-nested.input';

@InputType()
export class UserUpdateInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => RoleUpdateOneRequiredWithoutUsersNestedInput, { nullable: true })
  role?: RoleUpdateOneRequiredWithoutUsersNestedInput;

  @Field(() => ProfileUpdateOneWithoutUserNestedInput, { nullable: true })
  userProfile?: ProfileUpdateOneWithoutUserNestedInput;
}
