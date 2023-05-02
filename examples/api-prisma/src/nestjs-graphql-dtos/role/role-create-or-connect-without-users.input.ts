import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleCreateWithoutUsersInput } from './role-create-without-users.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';

@InputType()
export class RoleCreateOrConnectWithoutUsersInput {

    @Field(() => RoleWhereUniqueInput, {nullable:false})
    @Type(() => RoleWhereUniqueInput)
    where!: RoleWhereUniqueInput;

    @Field(() => RoleCreateWithoutUsersInput, {nullable:false})
    @Type(() => RoleCreateWithoutUsersInput)
    create!: RoleCreateWithoutUsersInput;
}
