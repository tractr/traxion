import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserMaxAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;
}
