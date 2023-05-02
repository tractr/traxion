import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class RightCreateWithoutRolesInput {

    @Field(() => String, {nullable:false})
    name!: string;
}
