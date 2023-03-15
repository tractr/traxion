import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleScalarWhereInput } from './role-scalar-where.input';
import { RoleUpdateManyMutationInput } from './role-update-many-mutation.input';

@InputType()
export class RoleUpdateManyWithWhereWithoutRightsInput {

    @Field(() => RoleScalarWhereInput, {nullable:false})
    @Type(() => RoleScalarWhereInput)
    where!: RoleScalarWhereInput;

    @Field(() => RoleUpdateManyMutationInput, {nullable:false})
    @Type(() => RoleUpdateManyMutationInput)
    data!: RoleUpdateManyMutationInput;
}
