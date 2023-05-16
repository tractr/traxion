import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class TaskWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;
}
