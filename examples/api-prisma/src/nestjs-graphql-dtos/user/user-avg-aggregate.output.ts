import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    roleId?: number;
}
