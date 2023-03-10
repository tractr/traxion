import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RightWhereUniqueInput } from './right-where-unique.input';
import { Type } from 'class-transformer';
import { RightCreateWithoutRolesInput } from './right-create-without-roles.input';

@InputType()
export class RightCreateOrConnectWithoutRolesInput {

    @Field(() => RightWhereUniqueInput, {nullable:false})
    @Type(() => RightWhereUniqueInput)
    where!: RightWhereUniqueInput;

    @Field(() => RightCreateWithoutRolesInput, {nullable:false})
    @Type(() => RightCreateWithoutRolesInput)
    create!: RightCreateWithoutRolesInput;
}
