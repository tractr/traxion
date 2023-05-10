import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutRoleInput } from './user-create-without-role.input';
import { HideField } from '@nestjs/graphql';
import { UserCreateOrConnectWithoutRoleInput } from './user-create-or-connect-without-role.input';
import { UserUpsertWithWhereUniqueWithoutRoleInput } from './user-upsert-with-where-unique-without-role.input';
import { UserCreateManyRoleInputEnvelope } from './user-create-many-role-input-envelope.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserUpdateWithWhereUniqueWithoutRoleInput } from './user-update-with-where-unique-without-role.input';
import { UserUpdateManyWithWhereWithoutRoleInput } from './user-update-many-with-where-without-role.input';
import { UserScalarWhereInput } from './user-scalar-where.input';

@InputType()
export class UserUpdateManyWithoutRoleNestedInput {

    @HideField()
    create?: Array<UserCreateWithoutRoleInput>;

    @HideField()
    connectOrCreate?: Array<UserCreateOrConnectWithoutRoleInput>;

    @HideField()
    upsert?: Array<UserUpsertWithWhereUniqueWithoutRoleInput>;

    @HideField()
    createMany?: UserCreateManyRoleInputEnvelope;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    set?: Array<UserWhereUniqueInput>;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    disconnect?: Array<UserWhereUniqueInput>;

    @HideField()
    delete?: Array<UserWhereUniqueInput>;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Array<UserWhereUniqueInput>;

    @HideField()
    update?: Array<UserUpdateWithWhereUniqueWithoutRoleInput>;

    @HideField()
    updateMany?: Array<UserUpdateManyWithWhereWithoutRoleInput>;

    @HideField()
    deleteMany?: Array<UserScalarWhereInput>;
}
