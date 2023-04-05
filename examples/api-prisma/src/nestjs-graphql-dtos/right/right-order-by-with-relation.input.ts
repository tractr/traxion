import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { RoleOrderByRelationAggregateInput } from '../role/role-order-by-relation-aggregate.input';

@InputType()
export class RightOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => RoleOrderByRelationAggregateInput, { nullable: true })
  roles?: RoleOrderByRelationAggregateInput;
}
