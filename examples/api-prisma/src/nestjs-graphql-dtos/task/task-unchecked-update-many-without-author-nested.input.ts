import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCreateWithoutAuthorInput } from './task-create-without-author.input';
import { HideField } from '@nestjs/graphql';
import { TaskCreateOrConnectWithoutAuthorInput } from './task-create-or-connect-without-author.input';
import { TaskUpsertWithWhereUniqueWithoutAuthorInput } from './task-upsert-with-where-unique-without-author.input';
import { TaskCreateManyAuthorInputEnvelope } from './task-create-many-author-input-envelope.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';
import { TaskUpdateWithWhereUniqueWithoutAuthorInput } from './task-update-with-where-unique-without-author.input';
import { TaskUpdateManyWithWhereWithoutAuthorInput } from './task-update-many-with-where-without-author.input';
import { TaskScalarWhereInput } from './task-scalar-where.input';

@InputType()
export class TaskUncheckedUpdateManyWithoutAuthorNestedInput {
  @HideField()
  create?: Array<TaskCreateWithoutAuthorInput>;

  @HideField()
  connectOrCreate?: Array<TaskCreateOrConnectWithoutAuthorInput>;

  @HideField()
  upsert?: Array<TaskUpsertWithWhereUniqueWithoutAuthorInput>;

  @HideField()
  createMany?: TaskCreateManyAuthorInputEnvelope;

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
  update?: Array<TaskUpdateWithWhereUniqueWithoutAuthorInput>;

  @HideField()
  updateMany?: Array<TaskUpdateManyWithWhereWithoutAuthorInput>;

  @HideField()
  deleteMany?: Array<TaskScalarWhereInput>;
}
