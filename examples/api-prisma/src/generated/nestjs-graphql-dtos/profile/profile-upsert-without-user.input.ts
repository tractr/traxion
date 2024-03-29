import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProfileCreateWithoutUserInput } from './profile-create-without-user.input';
import { ProfileUpdateWithoutUserInput } from './profile-update-without-user.input';

@InputType()
export class ProfileUpsertWithoutUserInput {
  @Field(() => ProfileUpdateWithoutUserInput, { nullable: false })
  @Type(() => ProfileUpdateWithoutUserInput)
  update!: ProfileUpdateWithoutUserInput;

  @Field(() => ProfileCreateWithoutUserInput, { nullable: false })
  @Type(() => ProfileCreateWithoutUserInput)
  create!: ProfileCreateWithoutUserInput;
}
