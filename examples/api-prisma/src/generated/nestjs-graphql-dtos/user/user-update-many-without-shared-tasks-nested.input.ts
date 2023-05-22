import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateManyWithoutSharedTasksNestedInput {
  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  set?: Array<UserWhereUniqueInput>;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  disconnect?: Array<UserWhereUniqueInput>;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Array<UserWhereUniqueInput>;
}
