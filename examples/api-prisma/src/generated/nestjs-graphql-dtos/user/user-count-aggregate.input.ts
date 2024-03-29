import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  email?: true;

  @Field(() => Boolean, { nullable: true })
  roles?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
