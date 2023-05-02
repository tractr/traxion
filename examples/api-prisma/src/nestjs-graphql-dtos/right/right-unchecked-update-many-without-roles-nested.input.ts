import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightCreateOrConnectWithoutRolesInput } from './right-create-or-connect-without-roles.input';
import { RightCreateWithoutRolesInput } from './right-create-without-roles.input';
import { RightScalarWhereInput } from './right-scalar-where.input';
import { RightUpdateManyWithWhereWithoutRolesInput } from './right-update-many-with-where-without-roles.input';
import { RightUpdateWithWhereUniqueWithoutRolesInput } from './right-update-with-where-unique-without-roles.input';
import { RightUpsertWithWhereUniqueWithoutRolesInput } from './right-upsert-with-where-unique-without-roles.input';
import { RightWhereUniqueInput } from './right-where-unique.input';

@InputType()
export class RightUncheckedUpdateManyWithoutRolesNestedInput {

    @Field(() => [RightCreateWithoutRolesInput], {nullable:true})
    @Type(() => RightCreateWithoutRolesInput)
    create?: Array<RightCreateWithoutRolesInput>;

    @Field(() => [RightCreateOrConnectWithoutRolesInput], {nullable:true})
    @Type(() => RightCreateOrConnectWithoutRolesInput)
    connectOrCreate?: Array<RightCreateOrConnectWithoutRolesInput>;

    @Field(() => [RightUpsertWithWhereUniqueWithoutRolesInput], {nullable:true})
    @Type(() => RightUpsertWithWhereUniqueWithoutRolesInput)
    upsert?: Array<RightUpsertWithWhereUniqueWithoutRolesInput>;

    @Field(() => [RightWhereUniqueInput], {nullable:true})
    @Type(() => RightWhereUniqueInput)
    set?: Array<RightWhereUniqueInput>;

    @Field(() => [RightWhereUniqueInput], {nullable:true})
    @Type(() => RightWhereUniqueInput)
    disconnect?: Array<RightWhereUniqueInput>;

    @Field(() => [RightWhereUniqueInput], {nullable:true})
    @Type(() => RightWhereUniqueInput)
    delete?: Array<RightWhereUniqueInput>;

    @Field(() => [RightWhereUniqueInput], {nullable:true})
    @Type(() => RightWhereUniqueInput)
    connect?: Array<RightWhereUniqueInput>;

    @Field(() => [RightUpdateWithWhereUniqueWithoutRolesInput], {nullable:true})
    @Type(() => RightUpdateWithWhereUniqueWithoutRolesInput)
    update?: Array<RightUpdateWithWhereUniqueWithoutRolesInput>;

    @Field(() => [RightUpdateManyWithWhereWithoutRolesInput], {nullable:true})
    @Type(() => RightUpdateManyWithWhereWithoutRolesInput)
    updateMany?: Array<RightUpdateManyWithWhereWithoutRolesInput>;

    @Field(() => [RightScalarWhereInput], {nullable:true})
    @Type(() => RightScalarWhereInput)
    deleteMany?: Array<RightScalarWhereInput>;
}
