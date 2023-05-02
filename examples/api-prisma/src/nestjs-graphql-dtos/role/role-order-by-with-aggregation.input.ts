import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { RoleCountOrderByAggregateInput } from './role-count-order-by-aggregate.input';
import { RoleAvgOrderByAggregateInput } from './role-avg-order-by-aggregate.input';
import { RoleMaxOrderByAggregateInput } from './role-max-order-by-aggregate.input';
import { RoleMinOrderByAggregateInput } from './role-min-order-by-aggregate.input';
import { RoleSumOrderByAggregateInput } from './role-sum-order-by-aggregate.input';

@InputType()
export class RoleOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => RoleCountOrderByAggregateInput, { nullable: true })
  _count?: RoleCountOrderByAggregateInput;

  @Field(() => RoleAvgOrderByAggregateInput, { nullable: true })
  _avg?: RoleAvgOrderByAggregateInput;

  @Field(() => RoleMaxOrderByAggregateInput, { nullable: true })
  _max?: RoleMaxOrderByAggregateInput;

  @Field(() => RoleMinOrderByAggregateInput, { nullable: true })
  _min?: RoleMinOrderByAggregateInput;

  @Field(() => RoleSumOrderByAggregateInput, { nullable: true })
  _sum?: RoleSumOrderByAggregateInput;
}
