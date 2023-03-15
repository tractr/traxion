import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleUpdateManyMutationInput } from './role-update-many-mutation.input';
import { RoleWhereInput } from './role-where.input';

@ArgsType()
export class UpdateManyRoleArgs {

    @Field(() => RoleUpdateManyMutationInput, {nullable:false})
    @Type(() => RoleUpdateManyMutationInput)
    data!: RoleUpdateManyMutationInput;

    @Field(() => RoleWhereInput, {nullable:true})
    @Type(() => RoleWhereInput)
    where?: RoleWhereInput;
}
