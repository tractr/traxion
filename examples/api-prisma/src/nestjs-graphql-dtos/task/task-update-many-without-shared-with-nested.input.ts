import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpdateManyWithoutSharedWithNestedInput {
  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  set?: Array<TaskWhereUniqueInput>;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  disconnect?: Array<TaskWhereUniqueInput>;
  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Array<TaskWhereUniqueInput>;
}
