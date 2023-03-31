import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoleSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
