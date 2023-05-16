import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskStatus } from '../prisma/task-status.enum';
import { UserCreateNestedManyWithoutSharedTasksInput } from '../user/user-create-nested-many-without-shared-tasks.input';

@InputType()
export class TaskCreateWithoutAuthorInput {
  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  status?: keyof typeof TaskStatus;

  @Field(() => UserCreateNestedManyWithoutSharedTasksInput, { nullable: true })
  sharedWith?: UserCreateNestedManyWithoutSharedTasksInput;
}
