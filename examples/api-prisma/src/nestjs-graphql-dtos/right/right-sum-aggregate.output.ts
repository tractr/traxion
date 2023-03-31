import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RightSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;
}
