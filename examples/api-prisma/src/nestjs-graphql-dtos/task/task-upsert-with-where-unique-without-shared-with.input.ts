import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';
import { TaskUpdateWithoutSharedWithInput } from './task-update-without-shared-with.input';
import { TaskCreateWithoutSharedWithInput } from './task-create-without-shared-with.input';

@InputType()
export class TaskUpsertWithWhereUniqueWithoutSharedWithInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: TaskWhereUniqueInput;

  @Field(() => TaskUpdateWithoutSharedWithInput, { nullable: false })
  @Type(() => TaskUpdateWithoutSharedWithInput)
  update!: TaskUpdateWithoutSharedWithInput;

  @Field(() => TaskCreateWithoutSharedWithInput, { nullable: false })
  @Type(() => TaskCreateWithoutSharedWithInput)
  create!: TaskCreateWithoutSharedWithInput;
}
