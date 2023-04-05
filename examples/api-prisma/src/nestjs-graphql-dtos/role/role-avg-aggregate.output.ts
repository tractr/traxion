import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoleAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;
}
