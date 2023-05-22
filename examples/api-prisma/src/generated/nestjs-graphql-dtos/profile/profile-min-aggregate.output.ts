import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileMinAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => Int, { nullable: true })
  userId?: number;
}
