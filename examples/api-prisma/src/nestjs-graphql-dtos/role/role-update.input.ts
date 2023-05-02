import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateManyWithoutRoleNestedInput } from '../user/user-update-many-without-role-nested.input';
import { RightUpdateManyWithoutRolesNestedInput } from '../right/right-update-many-without-roles-nested.input';

@InputType()
export class RoleUpdateInput {

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => UserUpdateManyWithoutRoleNestedInput, {nullable:true})
    users?: UserUpdateManyWithoutRoleNestedInput;

    @Field(() => RightUpdateManyWithoutRolesNestedInput, {nullable:true})
    rights?: RightUpdateManyWithoutRolesNestedInput;
}
