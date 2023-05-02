import { Field, InputType, Int } from '@nestjs/graphql';

import { RoleUncheckedUpdateManyWithoutRightsNestedInput } from '../role/role-unchecked-update-many-without-rights-nested.input';

@InputType()
export class RightUncheckedUpdateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => RoleUncheckedUpdateManyWithoutRightsNestedInput, {nullable:true})
    roles?: RoleUncheckedUpdateManyWithoutRightsNestedInput;
}
