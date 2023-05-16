import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { TaskStatus } from '../prisma/task-status.enum';
import { UserUncheckedCreateNestedManyWithoutSharedTasksInput } from '../user/user-unchecked-create-nested-many-without-shared-tasks.input';

@InputType()
export class TaskUncheckedCreateWithoutAuthorInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  status?: keyof typeof TaskStatus;

  @Field(() => UserUncheckedCreateNestedManyWithoutSharedTasksInput, {
    nullable: true,
  })
  sharedWith?: UserUncheckedCreateNestedManyWithoutSharedTasksInput;
}
