import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleWhereInput } from './role-where.input';

@InputType()
export class RoleListRelationFilter {

    @Field(() => RoleWhereInput, {nullable:true})
    every?: RoleWhereInput;

    @Field(() => RoleWhereInput, {nullable:true})
    some?: RoleWhereInput;

    @Field(() => RoleWhereInput, {nullable:true})
    none?: RoleWhereInput;
}
