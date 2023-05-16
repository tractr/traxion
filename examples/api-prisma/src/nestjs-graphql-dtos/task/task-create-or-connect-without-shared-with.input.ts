import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';
import { TaskCreateWithoutSharedWithInput } from './task-create-without-shared-with.input';

@InputType()
export class TaskCreateOrConnectWithoutSharedWithInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: TaskWhereUniqueInput;

  @Field(() => TaskCreateWithoutSharedWithInput, { nullable: false })
  @Type(() => TaskCreateWithoutSharedWithInput)
  create!: TaskCreateWithoutSharedWithInput;
}
