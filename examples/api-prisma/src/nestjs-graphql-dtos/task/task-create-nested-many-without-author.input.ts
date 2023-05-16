import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateNestedManyWithoutAuthorInput {
  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Array<TaskWhereUniqueInput>;
}
