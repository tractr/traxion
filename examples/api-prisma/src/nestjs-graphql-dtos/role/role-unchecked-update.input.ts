import { Field, InputType, Int } from '@nestjs/graphql';

import { RightUncheckedUpdateManyWithoutRolesNestedInput } from '../right/right-unchecked-update-many-without-roles-nested.input';
import { UserUncheckedUpdateManyWithoutRoleNestedInput } from '../user/user-unchecked-update-many-without-role-nested.input';

@InputType()
export class RoleUncheckedUpdateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => UserUncheckedUpdateManyWithoutRoleNestedInput, {nullable:true})
    users?: UserUncheckedUpdateManyWithoutRoleNestedInput;

    @Field(() => RightUncheckedUpdateManyWithoutRolesNestedInput, {nullable:true})
    rights?: RightUncheckedUpdateManyWithoutRolesNestedInput;
}
