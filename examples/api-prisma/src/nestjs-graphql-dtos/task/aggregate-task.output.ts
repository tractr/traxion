import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { TaskCountAggregate } from './task-count-aggregate.output';
import { TaskAvgAggregate } from './task-avg-aggregate.output';
import { TaskSumAggregate } from './task-sum-aggregate.output';
import { TaskMinAggregate } from './task-min-aggregate.output';
import { TaskMaxAggregate } from './task-max-aggregate.output';

@ObjectType()
export class AggregateTask {
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
