import { Field , InputType } from '@nestjs/graphql';

import { TaskStatus } from '../prisma/task-status.enum';
import { UserCreateNestedOneWithoutTasksInput } from '../user/user-create-nested-one-without-tasks.input';

@InputType()
export class TaskCreateWithoutSharedWithInput {
  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  status?: keyof typeof TaskStatus;

  @Field(() => UserCreateNestedOneWithoutTasksInput, { nullable: false })
  author!: UserCreateNestedOneWithoutTasksInput;
}
