import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCount {
  @Field(() => Int, { nullable: false })
  tasks?: number;

  @Field(() => Int, { nullable: false })
  sharedTasks?: number;
}
