import { ArgsType , Field , Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskAvgAggregateInput } from './task-avg-aggregate.input';
import { TaskCountAggregateInput } from './task-count-aggregate.input';
import { TaskMaxAggregateInput } from './task-max-aggregate.input';
import { TaskMinAggregateInput } from './task-min-aggregate.input';
import { TaskOrderByWithAggregationInput } from './task-order-by-with-aggregation.input';
import { TaskScalarFieldEnum } from './task-scalar-field.enum';
import { TaskScalarWhereWithAggregatesInput } from './task-scalar-where-with-aggregates.input';
import { TaskSumAggregateInput } from './task-sum-aggregate.input';
import { TaskWhereInput } from './task-where.input';

@ArgsType()
export class TaskGroupByArgs {
  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;

  @Field(() => [TaskOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<TaskOrderByWithAggregationInput>;

  @Field(() => [TaskScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof TaskScalarFieldEnum>;

  @Field(() => TaskScalarWhereWithAggregatesInput, { nullable: true })
  having?: TaskScalarWhereWithAggregatesInput;

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
