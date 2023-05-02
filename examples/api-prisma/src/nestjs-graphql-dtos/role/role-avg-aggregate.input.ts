import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class RoleAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;
}
