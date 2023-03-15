import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleCreateInput } from './role-create.input';
import { RoleUpdateInput } from './role-update.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';

@ArgsType()
export class UpsertOneRoleArgs {

    @Field(() => RoleWhereUniqueInput, {nullable:false})
    @Type(() => RoleWhereUniqueInput)
    where!: RoleWhereUniqueInput;

    @Field(() => RoleCreateInput, {nullable:false})
    @Type(() => RoleCreateInput)
    create!: RoleCreateInput;

    @Field(() => RoleUpdateInput, {nullable:false})
    @Type(() => RoleUpdateInput)
    update!: RoleUpdateInput;
}
