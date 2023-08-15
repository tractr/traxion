import { Field , InputType } from '@nestjs/graphql';

@InputType()
export class ProfileAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  userId?: true;
}
