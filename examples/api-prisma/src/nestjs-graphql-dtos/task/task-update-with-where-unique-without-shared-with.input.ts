import { Field , InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskUpdateWithoutSharedWithInput } from './task-update-without-shared-with.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpdateWithWhereUniqueWithoutSharedWithInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: TaskWhereUniqueInput;

  @Field(() => TaskUpdateWithoutSharedWithInput, { nullable: false })
  @Type(() => TaskUpdateWithoutSharedWithInput)
  data!: TaskUpdateWithoutSharedWithInput;
}
