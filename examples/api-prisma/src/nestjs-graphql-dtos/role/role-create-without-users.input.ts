import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class RoleCreateWithoutUsersInput {

    @Field(() => String, {nullable:false})
    name!: string;
}
