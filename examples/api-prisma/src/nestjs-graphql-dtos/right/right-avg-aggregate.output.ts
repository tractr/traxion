import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RightAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;
}
