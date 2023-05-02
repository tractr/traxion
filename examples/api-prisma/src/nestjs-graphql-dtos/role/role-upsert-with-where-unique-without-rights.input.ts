import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleCreateWithoutRightsInput } from './role-create-without-rights.input';
import { RoleUpdateWithoutRightsInput } from './role-update-without-rights.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';

@InputType()
export class RoleUpsertWithWhereUniqueWithoutRightsInput {

    @Field(() => RoleWhereUniqueInput, {nullable:false})
    @Type(() => RoleWhereUniqueInput)
    where!: RoleWhereUniqueInput;

    @Field(() => RoleUpdateWithoutRightsInput, {nullable:false})
    @Type(() => RoleUpdateWithoutRightsInput)
    update!: RoleUpdateWithoutRightsInput;

    @Field(() => RoleCreateWithoutRightsInput, {nullable:false})
    @Type(() => RoleCreateWithoutRightsInput)
    create!: RoleCreateWithoutRightsInput;
}
