import { Field, InputType } from '@nestjs/graphql';

import { RightCreateNestedManyWithoutRolesInput } from '../right/right-create-nested-many-without-roles.input';

@InputType()
export class RoleCreateWithoutUsersInput {

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => RightCreateNestedManyWithoutRolesInput, {nullable:true})
    rights?: RightCreateNestedManyWithoutRolesInput;
}
