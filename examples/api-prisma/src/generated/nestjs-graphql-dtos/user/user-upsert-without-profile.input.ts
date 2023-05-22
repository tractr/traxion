import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutProfileInput } from './user-create-without-profile.input';
import { UserUpdateWithoutProfileInput } from './user-update-without-profile.input';

@InputType()
export class UserUpsertWithoutProfileInput {
  @Field(() => UserUpdateWithoutProfileInput, { nullable: false })
  @Type(() => UserUpdateWithoutProfileInput)
  update!: UserUpdateWithoutProfileInput;

  @Field(() => UserCreateWithoutProfileInput, { nullable: false })
  @Type(() => UserCreateWithoutProfileInput)
  create!: UserCreateWithoutProfileInput;
}
