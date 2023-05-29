import { Field, InputType } from '@nestjs/graphql';

import { UserCreateNestedOneWithoutProfileInput } from '../user/user-create-nested-one-without-profile.input';

@InputType()
export class ProfileCreateInput {
  @Field(() => String, { nullable: false })
  firstName!: string;

  @Field(() => String, { nullable: false })
  lastName!: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => UserCreateNestedOneWithoutProfileInput, { nullable: false })
  user!: UserCreateNestedOneWithoutProfileInput;
}
