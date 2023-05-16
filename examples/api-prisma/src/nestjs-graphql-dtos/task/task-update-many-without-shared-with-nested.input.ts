import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCreateWithoutSharedWithInput } from './task-create-without-shared-with.input';
import { HideField } from '@nestjs/graphql';
import { TaskCreateOrConnectWithoutSharedWithInput } from './task-create-or-connect-without-shared-with.input';
import { TaskUpsertWithWhereUniqueWithoutSharedWithInput } from './task-upsert-with-where-unique-without-shared-with.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';
import { TaskUpdateWithWhereUniqueWithoutSharedWithInput } from './task-update-with-where-unique-without-shared-with.input';
import { TaskUpdateManyWithWhereWithoutSharedWithInput } from './task-update-many-with-where-without-shared-with.input';
import { TaskScalarWhereInput } from './task-scalar-where.input';

@InputType()
export class TaskUpdateManyWithoutSharedWithNestedInput {
  @HideField()
  create?: Array<TaskCreateWithoutSharedWithInput>;

  @HideField()
  connectOrCreate?: Array<TaskCreateOrConnectWithoutSharedWithInput>;

  @HideField()
  upsert?: Array<TaskUpsertWithWhereUniqueWithoutSharedWithInput>;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  set?: Array<TaskWhereUniqueInput>;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  disconnect?: Array<TaskWhereUniqueInput>;

  @HideField()
  delete?: Array<TaskWhereUniqueInput>;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Array<TaskWhereUniqueInput>;

  @HideField()
  update?: Array<TaskUpdateWithWhereUniqueWithoutSharedWithInput>;

  @HideField()
  updateMany?: Array<TaskUpdateManyWithWhereWithoutSharedWithInput>;

  @HideField()
  deleteMany?: Array<TaskScalarWhereInput>;
}
