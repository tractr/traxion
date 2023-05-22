import { Field, InputType } from '@nestjs/graphql';

import { TaskStatus } from '../prisma/task-status.enum';
import { UserUpdateOneRequiredWithoutTasksNestedInput } from '../user/user-update-one-required-without-tasks-nested.input';

@InputType()
export class TaskUpdateWithoutSharedWithInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  status?: keyof typeof TaskStatus;

  @Field(() => UserUpdateOneRequiredWithoutTasksNestedInput, { nullable: true })
  author?: UserUpdateOneRequiredWithoutTasksNestedInput;
}
