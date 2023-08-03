import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

import { TaskAvgAggregateInput } from './task-avg-aggregate.input';
import { TaskCountAggregateInput } from './task-count-aggregate.input';
import { TaskMaxAggregateInput } from './task-max-aggregate.input';
import { TaskMinAggregateInput } from './task-min-aggregate.input';
import { TaskOrderByWithRelationInput } from './task-order-by-with-relation.input';
import { TaskSumAggregateInput } from './task-sum-aggregate.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { TaskWhereInput } from './task-where.input';

@ArgsType()
export class TaskAggregateArgs {
  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;

  @Field(() => [TaskOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TaskOrderByWithRelationInput>;

  @Field(() => TaskWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => TaskCountAggregateInput, { nullable: true })
  _count?: TaskCountAggregateInput;

  @Field(() => TaskAvgAggregateInput, { nullable: true })
  _avg?: TaskAvgAggregateInput;

  @Field(() => TaskSumAggregateInput, { nullable: true })
  _sum?: TaskSumAggregateInput;

  @Field(() => TaskMinAggregateInput, { nullable: true })
  _min?: TaskMinAggregateInput;

  @Field(() => TaskMaxAggregateInput, { nullable: true })
  _max?: TaskMaxAggregateInput;
}
