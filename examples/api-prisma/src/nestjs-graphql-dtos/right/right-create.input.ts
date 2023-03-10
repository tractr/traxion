import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleCreateNestedManyWithoutRightsInput } from '../role/role-create-nested-many-without-rights.input';

@InputType()
export class RightCreateInput {

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => RoleCreateNestedManyWithoutRightsInput, {nullable:true})
    roles?: RoleCreateNestedManyWithoutRightsInput;
}
