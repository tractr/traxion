import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutUserProfileInput } from './user-create-without-user-profile.input';

@InputType()
export class UserCreateOrConnectWithoutUserProfileInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: UserWhereUniqueInput;

    @Field(() => UserCreateWithoutUserProfileInput, {nullable:false})
    @Type(() => UserCreateWithoutUserProfileInput)
    create!: UserCreateWithoutUserProfileInput;
}
