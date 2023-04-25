import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserUncheckedUpdateManyWithoutUsersInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;
}