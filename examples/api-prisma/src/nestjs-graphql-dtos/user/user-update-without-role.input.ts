import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserUpdateWithoutRoleInput {

    @Field(() => String, {nullable:true})
    email?: string;

    @Field(() => String, {nullable:true})
    name?: string;
}
