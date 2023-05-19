import { Field , InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ProfileOrderByWithRelationInput } from '../profile/profile-order-by-with-relation.input';
import { TaskOrderByRelationAggregateInput } from '../task/task-order-by-relation-aggregate.input';

@InputType()
export class UserOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  email?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  roles?: keyof typeof SortOrder;

  @Field(() => ProfileOrderByWithRelationInput, { nullable: true })
  profile?: ProfileOrderByWithRelationInput;

  @Field(() => TaskOrderByRelationAggregateInput, { nullable: true })
  tasks?: TaskOrderByRelationAggregateInput;

  @Field(() => TaskOrderByRelationAggregateInput, { nullable: true })
  sharedTasks?: TaskOrderByRelationAggregateInput;
}
