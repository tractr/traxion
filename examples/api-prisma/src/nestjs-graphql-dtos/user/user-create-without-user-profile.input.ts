import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleCreateNestedOneWithoutUsersInput } from '../role/role-create-nested-one-without-users.input';

@InputType()
export class UserCreateWithoutUserProfileInput {
  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => RoleCreateNestedOneWithoutUsersInput, { nullable: false })
  role!: RoleCreateNestedOneWithoutUsersInput;
}
