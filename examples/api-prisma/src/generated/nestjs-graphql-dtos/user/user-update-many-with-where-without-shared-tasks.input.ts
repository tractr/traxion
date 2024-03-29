import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserScalarWhereInput } from './user-scalar-where.input';
import { UserUpdateManyMutationInput } from './user-update-many-mutation.input';

@InputType()
export class UserUpdateManyWithWhereWithoutSharedTasksInput {
  @Field(() => UserScalarWhereInput, { nullable: false })
  @Type(() => UserScalarWhereInput)
  where!: UserScalarWhereInput;

  @Field(() => UserUpdateManyMutationInput, { nullable: false })
  @Type(() => UserUpdateManyMutationInput)
  data!: UserUpdateManyMutationInput;
}
