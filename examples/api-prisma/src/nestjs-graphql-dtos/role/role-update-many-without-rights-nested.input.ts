import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleCreateOrConnectWithoutRightsInput } from './role-create-or-connect-without-rights.input';
import { RoleCreateWithoutRightsInput } from './role-create-without-rights.input';
import { RoleScalarWhereInput } from './role-scalar-where.input';
import { RoleUpdateManyWithWhereWithoutRightsInput } from './role-update-many-with-where-without-rights.input';
import { RoleUpdateWithWhereUniqueWithoutRightsInput } from './role-update-with-where-unique-without-rights.input';
import { RoleUpsertWithWhereUniqueWithoutRightsInput } from './role-upsert-with-where-unique-without-rights.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';

@InputType()
export class RoleUpdateManyWithoutRightsNestedInput {

    @Field(() => [RoleCreateWithoutRightsInput], {nullable:true})
    @Type(() => RoleCreateWithoutRightsInput)
    create?: Array<RoleCreateWithoutRightsInput>;

    @Field(() => [RoleCreateOrConnectWithoutRightsInput], {nullable:true})
    @Type(() => RoleCreateOrConnectWithoutRightsInput)
    connectOrCreate?: Array<RoleCreateOrConnectWithoutRightsInput>;

    @Field(() => [RoleUpsertWithWhereUniqueWithoutRightsInput], {nullable:true})
    @Type(() => RoleUpsertWithWhereUniqueWithoutRightsInput)
    upsert?: Array<RoleUpsertWithWhereUniqueWithoutRightsInput>;

    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    set?: Array<RoleWhereUniqueInput>;

    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    disconnect?: Array<RoleWhereUniqueInput>;

    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    delete?: Array<RoleWhereUniqueInput>;

    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    connect?: Array<RoleWhereUniqueInput>;

    @Field(() => [RoleUpdateWithWhereUniqueWithoutRightsInput], {nullable:true})
    @Type(() => RoleUpdateWithWhereUniqueWithoutRightsInput)
    update?: Array<RoleUpdateWithWhereUniqueWithoutRightsInput>;

    @Field(() => [RoleUpdateManyWithWhereWithoutRightsInput], {nullable:true})
    @Type(() => RoleUpdateManyWithWhereWithoutRightsInput)
    updateMany?: Array<RoleUpdateManyWithWhereWithoutRightsInput>;

    @Field(() => [RoleScalarWhereInput], {nullable:true})
    @Type(() => RoleScalarWhereInput)
    deleteMany?: Array<RoleScalarWhereInput>;
}
