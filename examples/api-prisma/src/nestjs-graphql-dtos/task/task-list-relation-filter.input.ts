import { Field , InputType } from '@nestjs/graphql';

import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskListRelationFilter {
  @Field(() => TaskWhereInput, { nullable: true })
  every?: TaskWhereInput;

  @Field(() => TaskWhereInput, { nullable: true })
  some?: TaskWhereInput;

  @Field(() => TaskWhereInput, { nullable: true })
  none?: TaskWhereInput;
}
