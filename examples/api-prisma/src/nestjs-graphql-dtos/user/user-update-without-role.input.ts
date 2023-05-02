import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfileUpdateOneWithoutUserNestedInput } from '../profile/profile-update-one-without-user-nested.input';

@InputType()
export class UserUpdateWithoutRoleInput {

    @Field(() => String, {nullable:true})
    email?: string;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => ProfileUpdateOneWithoutUserNestedInput, {nullable:true})
    userProfile?: ProfileUpdateOneWithoutUserNestedInput;
}
