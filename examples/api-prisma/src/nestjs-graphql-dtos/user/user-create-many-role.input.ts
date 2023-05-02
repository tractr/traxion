import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserCreateManyRoleInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => String, {nullable:true})
    name?: string;
}
