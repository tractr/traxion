import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleCreateWithoutRightsInput } from './role-create-without-rights.input';
import { HideField } from '@nestjs/graphql';
import { RoleCreateOrConnectWithoutRightsInput } from './role-create-or-connect-without-rights.input';
import { RoleUpsertWithWhereUniqueWithoutRightsInput } from './role-upsert-with-where-unique-without-rights.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { Type } from 'class-transformer';
import { RoleUpdateWithWhereUniqueWithoutRightsInput } from './role-update-with-where-unique-without-rights.input';
import { RoleUpdateManyWithWhereWithoutRightsInput } from './role-update-many-with-where-without-rights.input';
import { RoleScalarWhereInput } from './role-scalar-where.input';

@InputType()
export class RoleUpdateManyWithoutRightsNestedInput {

    @HideField()
    create?: Array<RoleCreateWithoutRightsInput>;

    @HideField()
    connectOrCreate?: Array<RoleCreateOrConnectWithoutRightsInput>;

    @HideField()
    upsert?: Array<RoleUpsertWithWhereUniqueWithoutRightsInput>;

    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    set?: Array<RoleWhereUniqueInput>;

    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    disconnect?: Array<RoleWhereUniqueInput>;

    @HideField()
    delete?: Array<RoleWhereUniqueInput>;

    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    connect?: Array<RoleWhereUniqueInput>;

    @HideField()
    update?: Array<RoleUpdateWithWhereUniqueWithoutRightsInput>;

    @HideField()
    updateMany?: Array<RoleUpdateManyWithWhereWithoutRightsInput>;

    @HideField()
    deleteMany?: Array<RoleScalarWhereInput>;
}
