import { Field , Int , ObjectType } from '@nestjs/graphql';

import { TaskAvgAggregate } from './task-avg-aggregate.output';
import { TaskCountAggregate } from './task-count-aggregate.output';
import { TaskMaxAggregate } from './task-max-aggregate.output';
import { TaskMinAggregate } from './task-min-aggregate.output';
import { TaskSumAggregate } from './task-sum-aggregate.output';
import { TaskStatus } from '../prisma/task-status.enum';

@ObjectType()
export class TaskGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => TaskStatus, { nullable: false })
  status!: keyof typeof TaskStatus;

  @Field(() => Int, { nullable: false })
  authorId!: number;

  @Field(() => TaskCountAggregate, { nullable: true })
  _count?: TaskCountAggregate;

  @Field(() => TaskAvgAggregate, { nullable: true })
  _avg?: TaskAvgAggregate;

  @Field(() => TaskSumAggregate, { nullable: true })
  _sum?: TaskSumAggregate;

  @Field(() => TaskMinAggregate, { nullable: true })
  _min?: TaskMinAggregate;

  @Field(() => TaskMaxAggregate, { nullable: true })
  _max?: TaskMaxAggregate;
}
