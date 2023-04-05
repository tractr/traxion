import { Field, Int, ObjectType } from '@nestjs/graphql';

import { RightAvgAggregate } from './right-avg-aggregate.output';
import { RightCountAggregate } from './right-count-aggregate.output';
import { RightMaxAggregate } from './right-max-aggregate.output';
import { RightMinAggregate } from './right-min-aggregate.output';
import { RightSumAggregate } from './right-sum-aggregate.output';

@ObjectType()
export class RightGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => RightCountAggregate, { nullable: true })
  _count?: RightCountAggregate;

  @Field(() => RightAvgAggregate, { nullable: true })
  _avg?: RightAvgAggregate;

  @Field(() => RightSumAggregate, { nullable: true })
  _sum?: RightSumAggregate;

  @Field(() => RightMinAggregate, { nullable: true })
  _min?: RightMinAggregate;

  @Field(() => RightMaxAggregate, { nullable: true })
  _max?: RightMaxAggregate;
}
