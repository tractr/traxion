import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskScalarWhereInput } from './task-scalar-where.input';
import { Type } from 'class-transformer';
import { TaskUpdateManyMutationInput } from './task-update-many-mutation.input';

@InputType()
export class TaskUpdateManyWithWhereWithoutAuthorInput {
  @Field(() => TaskScalarWhereInput, { nullable: false })
  @Type(() => TaskScalarWhereInput)
  where!: TaskScalarWhereInput;

  @Field(() => TaskUpdateManyMutationInput, { nullable: false })
  @Type(() => TaskUpdateManyMutationInput)
  data!: TaskUpdateManyMutationInput;
}
