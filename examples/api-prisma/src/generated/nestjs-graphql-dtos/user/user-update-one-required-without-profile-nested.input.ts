import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateOneRequiredWithoutProfileNestedInput {
  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: UserWhereUniqueInput;
}
