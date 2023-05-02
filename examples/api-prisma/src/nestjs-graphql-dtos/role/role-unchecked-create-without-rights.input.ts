import { Field, InputType, Int } from '@nestjs/graphql';

import { UserUncheckedCreateNestedManyWithoutRoleInput } from '../user/user-unchecked-create-nested-many-without-role.input';

@InputType()
export class RoleUncheckedCreateWithoutRightsInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => UserUncheckedCreateNestedManyWithoutRoleInput, {nullable:true})
    users?: UserUncheckedCreateNestedManyWithoutRoleInput;
}
