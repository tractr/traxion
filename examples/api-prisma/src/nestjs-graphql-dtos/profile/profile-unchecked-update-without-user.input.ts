import { Field , InputType , Int } from '@nestjs/graphql';

@InputType()
export class ProfileUncheckedUpdateWithoutUserInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  bio?: string;
}
