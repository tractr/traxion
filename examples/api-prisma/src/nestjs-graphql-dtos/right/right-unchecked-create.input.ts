import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { RoleUncheckedCreateNestedManyWithoutRightsInput } from '../role/role-unchecked-create-nested-many-without-rights.input';

@InputType()
export class RightUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => RoleUncheckedCreateNestedManyWithoutRightsInput, {nullable:true})
    roles?: RoleUncheckedCreateNestedManyWithoutRightsInput;
}
