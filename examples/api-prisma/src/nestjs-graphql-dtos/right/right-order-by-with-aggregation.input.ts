import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { RightCountOrderByAggregateInput } from './right-count-order-by-aggregate.input';
import { RightAvgOrderByAggregateInput } from './right-avg-order-by-aggregate.input';
import { RightMaxOrderByAggregateInput } from './right-max-order-by-aggregate.input';
import { RightMinOrderByAggregateInput } from './right-min-order-by-aggregate.input';
import { RightSumOrderByAggregateInput } from './right-sum-order-by-aggregate.input';

@InputType()
export class RightOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => RightCountOrderByAggregateInput, {nullable:true})
    _count?: RightCountOrderByAggregateInput;

    @Field(() => RightAvgOrderByAggregateInput, {nullable:true})
    _avg?: RightAvgOrderByAggregateInput;

    @Field(() => RightMaxOrderByAggregateInput, {nullable:true})
    _max?: RightMaxOrderByAggregateInput;

    @Field(() => RightMinOrderByAggregateInput, {nullable:true})
    _min?: RightMinOrderByAggregateInput;

    @Field(() => RightSumOrderByAggregateInput, {nullable:true})
    _sum?: RightSumOrderByAggregateInput;
}
