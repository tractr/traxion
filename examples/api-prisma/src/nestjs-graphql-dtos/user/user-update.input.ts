import { Field, InputType } from '@nestjs/graphql';

import { RoleUpdateOneRequiredWithoutUsersNestedInput } from '../role/role-update-one-required-without-users-nested.input';

@InputType()
export class UserUpdateInput {

    @Field(() => String, {nullable:true})
    email?: string;

    @Field(() => String, {nullable:true})
    password?: string;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => RoleUpdateOneRequiredWithoutUsersNestedInput, {nullable:true})
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput;
}
