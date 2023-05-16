import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCreateWithoutSharedWithInput } from './task-create-without-shared-with.input';
import { HideField } from '@nestjs/graphql';
import { TaskCreateOrConnectWithoutSharedWithInput } from './task-create-or-connect-without-shared-with.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';

@InputType()
export class TaskUncheckedCreateNestedManyWithoutSharedWithInput {
  @HideField()
  create?: Array<TaskCreateWithoutSharedWithInput>;

  @HideField()
  connectOrCreate?: Array<TaskCreateOrConnectWithoutSharedWithInput>;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Array<TaskWhereUniqueInput>;
}
