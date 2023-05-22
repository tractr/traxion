import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  firstName!: number;

  @Field(() => Int, { nullable: false })
  lastName!: number;

  @Field(() => Int, { nullable: false })
  bio!: number;

  @Field(() => Int, { nullable: false })
  userId!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
