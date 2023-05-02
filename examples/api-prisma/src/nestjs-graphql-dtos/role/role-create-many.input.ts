import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RoleCreateManyInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    name!: string;
}
