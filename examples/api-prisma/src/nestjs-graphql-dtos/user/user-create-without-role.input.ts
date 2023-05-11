import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfileCreateNestedOneWithoutUserInput } from '../profile/profile-create-nested-one-without-user.input';

@InputType()
export class UserCreateWithoutRoleInput {
  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => ProfileCreateNestedOneWithoutUserInput, { nullable: true })
  userProfile?: ProfileCreateNestedOneWithoutUserInput;
}
