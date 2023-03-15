import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoleCount {

    @Field(() => Int, {nullable:false})
    users?: number;

    @Field(() => Int, {nullable:false})
    rights?: number;
}
