import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  authorId?: number;
}
