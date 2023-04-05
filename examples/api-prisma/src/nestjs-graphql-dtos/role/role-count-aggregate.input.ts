import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoleCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
