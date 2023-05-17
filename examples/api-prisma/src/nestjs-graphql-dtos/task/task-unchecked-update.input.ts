import { Field , InputType , Int } from '@nestjs/graphql';

import { TaskStatus } from '../prisma/task-status.enum';
import { UserUncheckedUpdateManyWithoutSharedTasksNestedInput } from '../user/user-unchecked-update-many-without-shared-tasks-nested.input';

@InputType()
export class TaskUncheckedUpdateInput {
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

  @Field(() => UserUncheckedUpdateManyWithoutSharedTasksNestedInput, {
    nullable: true,
  })
  sharedWith?: UserUncheckedUpdateManyWithoutSharedTasksNestedInput;
}
