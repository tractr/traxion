import { Field , Int , ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileMaxAggregate {
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
