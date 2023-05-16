import { Field, InputType } from '@nestjs/graphql';

import { TaskAvgOrderByAggregateInput } from './task-avg-order-by-aggregate.input';
import { TaskCountOrderByAggregateInput } from './task-count-order-by-aggregate.input';
import { TaskMaxOrderByAggregateInput } from './task-max-order-by-aggregate.input';
import { TaskMinOrderByAggregateInput } from './task-min-order-by-aggregate.input';
import { TaskSumOrderByAggregateInput } from './task-sum-order-by-aggregate.input';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class TaskOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  description?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  status?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  authorId?: keyof typeof SortOrder;

  @Field(() => TaskCountOrderByAggregateInput, { nullable: true })
  _count?: TaskCountOrderByAggregateInput;

  @Field(() => TaskAvgOrderByAggregateInput, { nullable: true })
  _avg?: TaskAvgOrderByAggregateInput;

  @Field(() => TaskMaxOrderByAggregateInput, { nullable: true })
  _max?: TaskMaxOrderByAggregateInput;

  @Field(() => TaskMinOrderByAggregateInput, { nullable: true })
  _min?: TaskMinOrderByAggregateInput;

  @Field(() => TaskSumOrderByAggregateInput, { nullable: true })
  _sum?: TaskSumOrderByAggregateInput;
}
