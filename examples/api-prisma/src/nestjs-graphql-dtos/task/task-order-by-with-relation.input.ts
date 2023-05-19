import { Field , InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { UserOrderByRelationAggregateInput } from '../user/user-order-by-relation-aggregate.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';

@InputType()
export class TaskOrderByWithRelationInput {
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

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  author?: UserOrderByWithRelationInput;

  @Field(() => UserOrderByRelationAggregateInput, { nullable: true })
  sharedWith?: UserOrderByRelationAggregateInput;
}
