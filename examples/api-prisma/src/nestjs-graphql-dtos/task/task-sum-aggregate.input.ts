import { Field , InputType } from '@nestjs/graphql';

@InputType()
export class TaskSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  authorId?: true;
}
