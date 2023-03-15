import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RightCreateWithoutRolesInput {

    @Field(() => String, {nullable:false})
    name!: string;
}
