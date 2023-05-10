import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleCreateWithoutRightsInput } from './role-create-without-rights.input';
import { HideField } from '@nestjs/graphql';
import { RoleCreateOrConnectWithoutRightsInput } from './role-create-or-connect-without-rights.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { Type } from 'class-transformer';

@InputType()
export class RoleUncheckedCreateNestedManyWithoutRightsInput {

    @HideField()
    create?: Array<RoleCreateWithoutRightsInput>;

    @HideField()
    connectOrCreate?: Array<RoleCreateOrConnectWithoutRightsInput>;

    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    connect?: Array<RoleWhereUniqueInput>;
}
