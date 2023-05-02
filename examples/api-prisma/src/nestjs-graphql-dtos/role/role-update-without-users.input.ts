import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RightUpdateManyWithoutRolesNestedInput } from '../right/right-update-many-without-roles-nested.input';

@InputType()
export class RoleUpdateWithoutUsersInput {

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => RightUpdateManyWithoutRolesNestedInput, {nullable:true})
    rights?: RightUpdateManyWithoutRolesNestedInput;
}
