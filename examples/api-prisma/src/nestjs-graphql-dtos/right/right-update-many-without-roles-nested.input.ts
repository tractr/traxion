import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RightCreateWithoutRolesInput } from './right-create-without-roles.input';
import { HideField } from '@nestjs/graphql';
import { RightCreateOrConnectWithoutRolesInput } from './right-create-or-connect-without-roles.input';
import { RightUpsertWithWhereUniqueWithoutRolesInput } from './right-upsert-with-where-unique-without-roles.input';
import { RightWhereUniqueInput } from './right-where-unique.input';
import { Type } from 'class-transformer';
import { RightUpdateWithWhereUniqueWithoutRolesInput } from './right-update-with-where-unique-without-roles.input';
import { RightUpdateManyWithWhereWithoutRolesInput } from './right-update-many-with-where-without-roles.input';
import { RightScalarWhereInput } from './right-scalar-where.input';

@InputType()
export class RightUpdateManyWithoutRolesNestedInput {

    @HideField()
    create?: Array<RightCreateWithoutRolesInput>;

    @HideField()
    connectOrCreate?: Array<RightCreateOrConnectWithoutRolesInput>;

    @HideField()
    upsert?: Array<RightUpsertWithWhereUniqueWithoutRolesInput>;

    @Field(() => [RightWhereUniqueInput], {nullable:true})
    @Type(() => RightWhereUniqueInput)
    set?: Array<RightWhereUniqueInput>;

    @Field(() => [RightWhereUniqueInput], {nullable:true})
    @Type(() => RightWhereUniqueInput)
    disconnect?: Array<RightWhereUniqueInput>;

    @HideField()
    delete?: Array<RightWhereUniqueInput>;

    @Field(() => [RightWhereUniqueInput], {nullable:true})
    @Type(() => RightWhereUniqueInput)
    connect?: Array<RightWhereUniqueInput>;

    @HideField()
    update?: Array<RightUpdateWithWhereUniqueWithoutRolesInput>;

    @HideField()
    updateMany?: Array<RightUpdateManyWithWhereWithoutRolesInput>;

    @HideField()
    deleteMany?: Array<RightScalarWhereInput>;
}
