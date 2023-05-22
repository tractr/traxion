import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
