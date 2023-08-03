import { Field , InputType , Int } from '@nestjs/graphql';

@InputType()
export class ProfileUncheckedUpdateManyInput {
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
