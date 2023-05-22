import { Field, InputType } from '@nestjs/graphql';

import { UserUpdateOneRequiredWithoutProfileNestedInput } from '../user/user-update-one-required-without-profile-nested.input';

@InputType()
export class ProfileUpdateInput {
  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => UserUpdateOneRequiredWithoutProfileNestedInput, {
    nullable: true,
  })
  user?: UserUpdateOneRequiredWithoutProfileNestedInput;
}
