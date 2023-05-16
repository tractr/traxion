import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { TaskStatus } from '../prisma/task-status.enum';
import { UserUncheckedUpdateManyWithoutSharedTasksNestedInput } from '../user/user-unchecked-update-many-without-shared-tasks-nested.input';

@InputType()
export class TaskUncheckedUpdateWithoutAuthorInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  status?: keyof typeof TaskStatus;

  @Field(() => UserUncheckedUpdateManyWithoutSharedTasksNestedInput, {
    nullable: true,
  })
  sharedWith?: UserUncheckedUpdateManyWithoutSharedTasksNestedInput;
}
