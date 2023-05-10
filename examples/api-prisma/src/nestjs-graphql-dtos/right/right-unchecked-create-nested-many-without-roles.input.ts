import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RightCreateWithoutRolesInput } from './right-create-without-roles.input';
import { HideField } from '@nestjs/graphql';
import { RightCreateOrConnectWithoutRolesInput } from './right-create-or-connect-without-roles.input';
import { RightWhereUniqueInput } from './right-where-unique.input';
import { Type } from 'class-transformer';

@InputType()
export class RightUncheckedCreateNestedManyWithoutRolesInput {

    @HideField()
    create?: Array<RightCreateWithoutRolesInput>;

    @HideField()
    connectOrCreate?: Array<RightCreateOrConnectWithoutRolesInput>;

    @Field(() => [RightWhereUniqueInput], {nullable:true})
    @Type(() => RightWhereUniqueInput)
    connect?: Array<RightWhereUniqueInput>;
}
