import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RightWhereInput } from './right-where.input';
import { Type } from 'class-transformer';
import { RightOrderByWithRelationInput } from './right-order-by-with-relation.input';
import { RightWhereUniqueInput } from './right-where-unique.input';
import { Int } from '@nestjs/graphql';
import { RightCountAggregateInput } from './right-count-aggregate.input';
import { RightAvgAggregateInput } from './right-avg-aggregate.input';
import { RightSumAggregateInput } from './right-sum-aggregate.input';
import { RightMinAggregateInput } from './right-min-aggregate.input';
import { RightMaxAggregateInput } from './right-max-aggregate.input';

@ArgsType()
export class RightAggregateArgs {

    @Field(() => RightWhereInput, {nullable:true})
    @Type(() => RightWhereInput)
    where?: RightWhereInput;

    @Field(() => [RightOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<RightOrderByWithRelationInput>;

    @Field(() => RightWhereUniqueInput, {nullable:true})
    cursor?: RightWhereUniqueInput;

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
