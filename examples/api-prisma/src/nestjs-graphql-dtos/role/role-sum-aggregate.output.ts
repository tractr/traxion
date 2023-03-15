import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoleSumAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;
}
