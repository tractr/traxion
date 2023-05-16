import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TaskWhereInput } from './task-where.input';
import { Type } from 'class-transformer';
import { TaskOrderByWithRelationInput } from './task-order-by-with-relation.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Int } from '@nestjs/graphql';
import { TaskCountAggregateInput } from './task-count-aggregate.input';
import { TaskAvgAggregateInput } from './task-avg-aggregate.input';
import { TaskSumAggregateInput } from './task-sum-aggregate.input';
import { TaskMinAggregateInput } from './task-min-aggregate.input';
import { TaskMaxAggregateInput } from './task-max-aggregate.input';

@ArgsType()
export class TaskAggregateArgs {
  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;

  @Field(() => [TaskOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TaskOrderByWithRelationInput>;

  @Field(() => TaskWhereUniqueInput, { nullable: true })
  cursor?: TaskWhereUniqueInput;

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
