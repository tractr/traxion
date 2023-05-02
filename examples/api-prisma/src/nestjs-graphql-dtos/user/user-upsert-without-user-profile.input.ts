import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutUserProfileInput } from './user-update-without-user-profile.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutUserProfileInput } from './user-create-without-user-profile.input';

@InputType()
export class UserUpsertWithoutUserProfileInput {

    @Field(() => UserUpdateWithoutUserProfileInput, {nullable:false})
    @Type(() => UserUpdateWithoutUserProfileInput)
    update!: UserUpdateWithoutUserProfileInput;

    @Field(() => UserCreateWithoutUserProfileInput, {nullable:false})
    @Type(() => UserCreateWithoutUserProfileInput)
    create!: UserCreateWithoutUserProfileInput;
}
