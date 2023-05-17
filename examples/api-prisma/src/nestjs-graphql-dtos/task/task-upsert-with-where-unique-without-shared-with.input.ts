import { Field , InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateWithoutSharedWithInput } from './task-create-without-shared-with.input';
import { TaskUpdateWithoutSharedWithInput } from './task-update-without-shared-with.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpsertWithWhereUniqueWithoutSharedWithInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: TaskWhereUniqueInput;

  @Field(() => TaskUpdateWithoutSharedWithInput, { nullable: false })
  @Type(() => TaskUpdateWithoutSharedWithInput)
  update!: TaskUpdateWithoutSharedWithInput;

  @Field(() => TaskCreateWithoutSharedWithInput, { nullable: false })
  @Type(() => TaskCreateWithoutSharedWithInput)
  create!: TaskCreateWithoutSharedWithInput;
}
