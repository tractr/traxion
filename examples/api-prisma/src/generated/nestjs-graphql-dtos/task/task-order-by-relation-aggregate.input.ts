import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class TaskOrderByRelationAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  _count?: keyof typeof SortOrder;
}
