import { Field , InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProfileUpdateWithoutUserInput } from './profile-update-without-user.input';
import { ProfileWhereInput } from './profile-where.input';

@InputType()
export class ProfileUpdateToOneWithWhereWithoutUserInput {
  @Field(() => ProfileWhereInput, { nullable: true })
  @Type(() => ProfileWhereInput)
  where?: ProfileWhereInput;

  @Field(() => ProfileUpdateWithoutUserInput, { nullable: false })
  @Type(() => ProfileUpdateWithoutUserInput)
  data!: ProfileUpdateWithoutUserInput;
}
