import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfileCreateWithoutUserInput } from './profile-create-without-user.input';
import { HideField } from '@nestjs/graphql';
import { ProfileCreateOrConnectWithoutUserInput } from './profile-create-or-connect-without-user.input';
import { ProfileWhereUniqueInput } from './profile-where-unique.input';
import { Type } from 'class-transformer';

@InputType()
export class ProfileCreateNestedOneWithoutUserInput {

    @HideField()
    create?: ProfileCreateWithoutUserInput;

    @HideField()
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput;

    @Field(() => ProfileWhereUniqueInput, {nullable:true})
    @Type(() => ProfileWhereUniqueInput)
    connect?: ProfileWhereUniqueInput;
}
