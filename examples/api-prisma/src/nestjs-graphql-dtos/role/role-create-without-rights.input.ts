import { Field, InputType } from '@nestjs/graphql';

import { UserCreateNestedManyWithoutRoleInput } from '../user/user-create-nested-many-without-role.input';

@InputType()
export class RoleCreateWithoutRightsInput {

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => UserCreateNestedManyWithoutRoleInput, {nullable:true})
    users?: UserCreateNestedManyWithoutRoleInput;
}
