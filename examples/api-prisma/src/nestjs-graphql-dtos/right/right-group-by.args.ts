import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightAvgAggregateInput } from './right-avg-aggregate.input';
import { RightCountAggregateInput } from './right-count-aggregate.input';
import { RightMaxAggregateInput } from './right-max-aggregate.input';
import { RightMinAggregateInput } from './right-min-aggregate.input';
import { RightOrderByWithAggregationInput } from './right-order-by-with-aggregation.input';
import { RightScalarFieldEnum } from './right-scalar-field.enum';
import { RightScalarWhereWithAggregatesInput } from './right-scalar-where-with-aggregates.input';
import { RightSumAggregateInput } from './right-sum-aggregate.input';
import { RightWhereInput } from './right-where.input';

@ArgsType()
export class RightGroupByArgs {

    @Field(() => RightWhereInput, {nullable:true})
    @Type(() => RightWhereInput)
    where?: RightWhereInput;

    @Field(() => [RightOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<RightOrderByWithAggregationInput>;

    @Field(() => [RightScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof RightScalarFieldEnum>;

    @Field(() => RightScalarWhereWithAggregatesInput, {nullable:true})
    having?: RightScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => RightCountAggregateInput, {nullable:true})
    _count?: RightCountAggregateInput;

    @Field(() => RightAvgAggregateInput, {nullable:true})
    _avg?: RightAvgAggregateInput;

    @Field(() => RightSumAggregateInput, {nullable:true})
    _sum?: RightSumAggregateInput;

    @Field(() => RightMinAggregateInput, {nullable:true})
    _min?: RightMinAggregateInput;

    @Field(() => RightMaxAggregateInput, {nullable:true})
    _max?: RightMaxAggregateInput;
}
