import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ProfileCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    address?: true;

    @Field(() => Boolean, {nullable:true})
    userId?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
