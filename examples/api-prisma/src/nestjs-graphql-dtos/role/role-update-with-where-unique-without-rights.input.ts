import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleUpdateWithoutRightsInput } from './role-update-without-rights.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';

@InputType()
export class RoleUpdateWithWhereUniqueWithoutRightsInput {

    @Field(() => RoleWhereUniqueInput, {nullable:false})
    @Type(() => RoleWhereUniqueInput)
    where!: RoleWhereUniqueInput;

    @Field(() => RoleUpdateWithoutRightsInput, {nullable:false})
    @Type(() => RoleUpdateWithoutRightsInput)
    data!: RoleUpdateWithoutRightsInput;
}
