import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  email!: number;

  @Field(() => Int, { nullable: false })
  roles!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
