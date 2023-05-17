import { Field , InputType } from '@nestjs/graphql';

@InputType()
export class TaskMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  title?: true;

  @Field(() => Boolean, { nullable: true })
  description?: true;

  @Field(() => Boolean, { nullable: true })
  status?: true;

  @Field(() => Boolean, { nullable: true })
  authorId?: true;
}
