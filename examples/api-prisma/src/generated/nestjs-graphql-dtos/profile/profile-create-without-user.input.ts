import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProfileCreateWithoutUserInput {
  @Field(() => String, { nullable: false })
  firstName!: string;

  @Field(() => String, { nullable: false })
  lastName!: string;

  @Field(() => String, { nullable: true })
  bio?: string;
}
