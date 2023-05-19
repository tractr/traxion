import { Field , InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ProfileCountOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  firstName?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  lastName?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  bio?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  userId?: keyof typeof SortOrder;
}
