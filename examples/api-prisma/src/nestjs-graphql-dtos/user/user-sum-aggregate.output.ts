import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;
}
