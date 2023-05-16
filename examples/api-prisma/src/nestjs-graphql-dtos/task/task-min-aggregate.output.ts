import { Field, Int, ObjectType } from '@nestjs/graphql';

import { TaskStatus } from '../prisma/task-status.enum';

@ObjectType()
export class TaskMinAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  status?: keyof typeof TaskStatus;

  @Field(() => Int, { nullable: true })
  authorId?: number;
}
