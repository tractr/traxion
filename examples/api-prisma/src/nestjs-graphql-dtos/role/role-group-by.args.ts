import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RoleWhereInput } from './role-where.input';
import { Type } from 'class-transformer';
import { RoleOrderByWithAggregationInput } from './role-order-by-with-aggregation.input';
import { RoleScalarFieldEnum } from './role-scalar-field.enum';
import { RoleScalarWhereWithAggregatesInput } from './role-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { RoleCountAggregateInput } from './role-count-aggregate.input';
import { RoleAvgAggregateInput } from './role-avg-aggregate.input';
import { RoleSumAggregateInput } from './role-sum-aggregate.input';
import { RoleMinAggregateInput } from './role-min-aggregate.input';
import { RoleMaxAggregateInput } from './role-max-aggregate.input';

@ArgsType()
export class RoleGroupByArgs {

    @Field(() => RoleWhereInput, {nullable:true})
    @Type(() => RoleWhereInput)
    where?: RoleWhereInput;

    @Field(() => [RoleOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<RoleOrderByWithAggregationInput>;

    @Field(() => [RoleScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof RoleScalarFieldEnum>;

    @Field(() => RoleScalarWhereWithAggregatesInput, {nullable:true})
    having?: RoleScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => RoleCountAggregateInput, {nullable:true})
    _count?: RoleCountAggregateInput;

    @Field(() => RoleAvgAggregateInput, {nullable:true})
    _avg?: RoleAvgAggregateInput;

    @Field(() => RoleSumAggregateInput, {nullable:true})
    _sum?: RoleSumAggregateInput;

    @Field(() => RoleMinAggregateInput, {nullable:true})
    _min?: RoleMinAggregateInput;

    @Field(() => RoleMaxAggregateInput, {nullable:true})
    _max?: RoleMaxAggregateInput;
}
