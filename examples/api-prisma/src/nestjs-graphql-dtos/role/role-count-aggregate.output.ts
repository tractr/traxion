import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoleCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    name!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
