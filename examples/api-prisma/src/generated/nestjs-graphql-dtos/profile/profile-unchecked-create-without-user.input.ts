import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ProfileUncheckedCreateWithoutUserInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  firstName!: string;

  @Field(() => String, { nullable: false })
  lastName!: string;

  @Field(() => String, { nullable: true })
  bio?: string;
}
