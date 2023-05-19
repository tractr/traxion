import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskScalarWhereInput } from './task-scalar-where.input';
import { TaskUpdateManyMutationInput } from './task-update-many-mutation.input';

@InputType()
export class TaskUpdateManyWithWhereWithoutSharedWithInput {
  @Field(() => TaskScalarWhereInput, { nullable: false })
  @Type(() => TaskScalarWhereInput)
  where!: TaskScalarWhereInput;

  @Field(() => TaskUpdateManyMutationInput, { nullable: false })
  @Type(() => TaskUpdateManyMutationInput)
  data!: TaskUpdateManyMutationInput;
}
