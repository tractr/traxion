import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoleMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    name?: true;
}
