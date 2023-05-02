import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateOneRequiredWithoutUserProfileNestedInput } from '../user/user-update-one-required-without-user-profile-nested.input';

@InputType()
export class ProfileUpdateInput {

    @Field(() => String, {nullable:true})
    address?: string;

    @Field(() => UserUpdateOneRequiredWithoutUserProfileNestedInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutUserProfileNestedInput;
}
