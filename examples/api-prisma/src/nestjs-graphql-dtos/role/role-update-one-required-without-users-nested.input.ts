import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleCreateWithoutUsersInput } from './role-create-without-users.input';
import { HideField } from '@nestjs/graphql';
import { RoleCreateOrConnectWithoutUsersInput } from './role-create-or-connect-without-users.input';
import { RoleUpsertWithoutUsersInput } from './role-upsert-without-users.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { Type } from 'class-transformer';
import { RoleUpdateWithoutUsersInput } from './role-update-without-users.input';

@InputType()
export class RoleUpdateOneRequiredWithoutUsersNestedInput {

    @HideField()
    create?: RoleCreateWithoutUsersInput;

    @HideField()
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput;

    @HideField()
    upsert?: RoleUpsertWithoutUsersInput;

    @Field(() => RoleWhereUniqueInput, {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    connect?: RoleWhereUniqueInput;

    @HideField()
    update?: RoleUpdateWithoutUsersInput;
}
