import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutUserProfileInput } from '../user/user-create-nested-one-without-user-profile.input';

@InputType()
export class ProfileCreateInput {
  @Field(() => String, { nullable: false })
  address!: string;

  @Field(() => UserCreateNestedOneWithoutUserProfileInput, { nullable: false })
  user!: UserCreateNestedOneWithoutUserProfileInput;
}
