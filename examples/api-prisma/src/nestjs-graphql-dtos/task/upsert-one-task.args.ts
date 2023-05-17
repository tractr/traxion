import { ArgsType , Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateInput } from './task-create.input';
import { TaskUpdateInput } from './task-update.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@ArgsType()
export class UpsertOneTaskArgs {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: TaskWhereUniqueInput;

  @Field(() => TaskCreateInput, { nullable: false })
  @Type(() => TaskCreateInput)
  create!: TaskCreateInput;

  @Field(() => TaskUpdateInput, { nullable: false })
  @Type(() => TaskUpdateInput)
  update!: TaskUpdateInput;
}
