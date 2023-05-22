import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  userId?: number;
}
