import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
