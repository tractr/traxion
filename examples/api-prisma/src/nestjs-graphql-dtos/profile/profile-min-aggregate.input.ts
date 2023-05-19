import { Field , InputType } from '@nestjs/graphql';

@InputType()
export class ProfileMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  firstName?: true;

  @Field(() => Boolean, { nullable: true })
  lastName?: true;

  @Field(() => Boolean, { nullable: true })
  bio?: true;

  @Field(() => Boolean, { nullable: true })
  userId?: true;
}
