import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCreateWithoutAuthorInput } from './task-create-without-author.input';
import { HideField } from '@nestjs/graphql';
import { TaskCreateOrConnectWithoutAuthorInput } from './task-create-or-connect-without-author.input';
import { TaskCreateManyAuthorInputEnvelope } from './task-create-many-author-input-envelope.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';

@InputType()
export class TaskCreateNestedManyWithoutAuthorInput {
  @HideField()
  create?: Array<TaskCreateWithoutAuthorInput>;

  @HideField()
  connectOrCreate?: Array<TaskCreateOrConnectWithoutAuthorInput>;

  @HideField()
  createMany?: TaskCreateManyAuthorInputEnvelope;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Array<TaskWhereUniqueInput>;
}
