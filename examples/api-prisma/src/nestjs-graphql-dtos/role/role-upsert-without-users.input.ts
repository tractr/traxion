import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleCreateWithoutUsersInput } from './role-create-without-users.input';
import { RoleUpdateWithoutUsersInput } from './role-update-without-users.input';

@InputType()
export class RoleUpsertWithoutUsersInput {

    @Field(() => RoleUpdateWithoutUsersInput, {nullable:false})
    @Type(() => RoleUpdateWithoutUsersInput)
    update!: RoleUpdateWithoutUsersInput;

    @Field(() => RoleCreateWithoutUsersInput, {nullable:false})
    @Type(() => RoleCreateWithoutUsersInput)
    create!: RoleCreateWithoutUsersInput;
}
