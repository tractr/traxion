import { Field , InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutProfileInput } from './user-update-without-profile.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutProfileInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutProfileInput, { nullable: false })
  @Type(() => UserUpdateWithoutProfileInput)
  data!: UserUpdateWithoutProfileInput;
}
