import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RightWhereUniqueInput } from './right-where-unique.input';
import { Type } from 'class-transformer';
import { RightUpdateWithoutRolesInput } from './right-update-without-roles.input';

@InputType()
export class RightUpdateWithWhereUniqueWithoutRolesInput {

    @Field(() => RightWhereUniqueInput, {nullable:false})
    @Type(() => RightWhereUniqueInput)
    where!: RightWhereUniqueInput;

    @Field(() => RightUpdateWithoutRolesInput, {nullable:false})
    @Type(() => RightUpdateWithoutRolesInput)
    data!: RightUpdateWithoutRolesInput;
}
