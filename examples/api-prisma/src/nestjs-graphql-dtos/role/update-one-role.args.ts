import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RoleUpdateInput } from './role-update.input';
import { Type } from 'class-transformer';
import { RoleWhereUniqueInput } from './role-where-unique.input';

@ArgsType()
export class UpdateOneRoleArgs {

    @Field(() => RoleUpdateInput, {nullable:false})
    @Type(() => RoleUpdateInput)
    data!: RoleUpdateInput;

    @Field(() => RoleWhereUniqueInput, {nullable:false})
    @Type(() => RoleWhereUniqueInput)
    where!: RoleWhereUniqueInput;
}
