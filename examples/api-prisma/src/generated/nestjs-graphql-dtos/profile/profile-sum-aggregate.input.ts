import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProfileSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  userId?: true;
}
