import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ProfileCreateWithoutUserInput {

    @Field(() => String, {nullable:false})
    address!: string;
}
