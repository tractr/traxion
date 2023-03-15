import { Field, InputType, Int } from '@nestjs/graphql';

import { RightUncheckedCreateNestedManyWithoutRolesInput } from '../right/right-unchecked-create-nested-many-without-roles.input';
import { UserUncheckedCreateNestedManyWithoutRoleInput } from '../user/user-unchecked-create-nested-many-without-role.input';

@InputType()
export class RoleUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => UserUncheckedCreateNestedManyWithoutRoleInput, {nullable:true})
    users?: UserUncheckedCreateNestedManyWithoutRoleInput;

    @Field(() => RightUncheckedCreateNestedManyWithoutRolesInput, {nullable:true})
    rights?: RightUncheckedCreateNestedManyWithoutRolesInput;
}
