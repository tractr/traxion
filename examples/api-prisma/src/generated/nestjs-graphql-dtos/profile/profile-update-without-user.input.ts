import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProfileUpdateWithoutUserInput {
  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  bio?: string;
}
