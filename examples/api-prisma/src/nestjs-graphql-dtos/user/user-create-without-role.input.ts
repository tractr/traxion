import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCreateWithoutRoleInput {

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => String, {nullable:true})
    name?: string;
}
