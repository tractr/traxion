import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightCreateWithoutRolesInput } from './right-create-without-roles.input';
import { RightWhereUniqueInput } from './right-where-unique.input';

@InputType()
export class RightCreateOrConnectWithoutRolesInput {

    @Field(() => RightWhereUniqueInput, {nullable:false})
    @Type(() => RightWhereUniqueInput)
    where!: RightWhereUniqueInput;

    @Field(() => RightCreateWithoutRolesInput, {nullable:false})
    @Type(() => RightCreateWithoutRolesInput)
    create!: RightCreateWithoutRolesInput;
}
