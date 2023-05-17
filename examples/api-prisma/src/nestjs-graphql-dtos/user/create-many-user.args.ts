import { ArgsType , Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateManyInput } from './user-create-many.input';


@ArgsType()
export class CreateManyUserArgs {
  @Field(() => [UserCreateManyInput], { nullable: false })
  @Type(() => UserCreateManyInput)
  data!: Array<UserCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
