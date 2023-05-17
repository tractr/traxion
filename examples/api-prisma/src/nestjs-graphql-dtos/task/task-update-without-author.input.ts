import { Field , InputType } from '@nestjs/graphql';

import { TaskStatus } from '../prisma/task-status.enum';
import { UserUpdateManyWithoutSharedTasksNestedInput } from '../user/user-update-many-without-shared-tasks-nested.input';

@InputType()
export class TaskUpdateWithoutAuthorInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  status?: keyof typeof TaskStatus;

  @Field(() => UserUpdateManyWithoutSharedTasksNestedInput, { nullable: true })
  sharedWith?: UserUpdateManyWithoutSharedTasksNestedInput;
}
