import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateInput } from './user-create.input';

@ArgsType()
export class CreateOneUserArgs {
  @Field(() => UserCreateInput, { nullable: false })
  @Type(() => UserCreateInput)
  data!: UserCreateInput;
}
