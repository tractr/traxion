import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutRoleInput } from './user-create-without-role.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutRoleInput } from './user-create-or-connect-without-role.input';
import { UserCreateManyRoleInputEnvelope } from './user-create-many-role-input-envelope.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedManyWithoutRoleInput {

    @Field(() => [UserCreateWithoutRoleInput], {nullable:true})
    @Type(() => UserCreateWithoutRoleInput)
    create?: Array<UserCreateWithoutRoleInput>;

    @Field(() => [UserCreateOrConnectWithoutRoleInput], {nullable:true})
    @Type(() => UserCreateOrConnectWithoutRoleInput)
    connectOrCreate?: Array<UserCreateOrConnectWithoutRoleInput>;

    @Field(() => UserCreateManyRoleInputEnvelope, {nullable:true})
    @Type(() => UserCreateManyRoleInputEnvelope)
    createMany?: UserCreateManyRoleInputEnvelope;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Array<UserWhereUniqueInput>;
}
