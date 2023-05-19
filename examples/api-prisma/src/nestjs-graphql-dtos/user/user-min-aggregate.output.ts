import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserMinAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;
}
