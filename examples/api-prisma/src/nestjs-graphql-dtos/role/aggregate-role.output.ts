import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { RoleCountAggregate } from './role-count-aggregate.output';
import { RoleAvgAggregate } from './role-avg-aggregate.output';
import { RoleSumAggregate } from './role-sum-aggregate.output';
import { RoleMinAggregate } from './role-min-aggregate.output';
import { RoleMaxAggregate } from './role-max-aggregate.output';

@ObjectType()
export class AggregateRole {

    @Field(() => RoleCountAggregate, {nullable:true})
    _count?: RoleCountAggregate;

    @Field(() => RoleAvgAggregate, {nullable:true})
    _avg?: RoleAvgAggregate;

    @Field(() => RoleSumAggregate, {nullable:true})
    _sum?: RoleSumAggregate;

    @Field(() => RoleMinAggregate, {nullable:true})
    _min?: RoleMinAggregate;

    @Field(() => RoleMaxAggregate, {nullable:true})
    _max?: RoleMaxAggregate;
}
