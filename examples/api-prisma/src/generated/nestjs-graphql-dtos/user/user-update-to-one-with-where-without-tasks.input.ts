import { Field , InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutTasksInput } from './user-update-without-tasks.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutTasksInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutTasksInput, { nullable: false })
  @Type(() => UserUpdateWithoutTasksInput)
  data!: UserUpdateWithoutTasksInput;
}
