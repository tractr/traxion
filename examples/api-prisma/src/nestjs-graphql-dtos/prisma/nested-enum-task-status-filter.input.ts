import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';

@InputType()
export class NestedEnumTaskStatusFilter {
  @Field(() => TaskStatus, { nullable: true })
  equals?: keyof typeof TaskStatus;

  @Field(() => [TaskStatus], { nullable: true })
  in?: Array<keyof typeof TaskStatus>;

  @Field(() => [TaskStatus], { nullable: true })
  notIn?: Array<keyof typeof TaskStatus>;

  @Field(() => NestedEnumTaskStatusFilter, { nullable: true })
  not?: NestedEnumTaskStatusFilter;
}
