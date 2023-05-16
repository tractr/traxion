import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';
import { NestedEnumTaskStatusFilter } from './nested-enum-task-status-filter.input';

@InputType()
export class EnumTaskStatusFilter {
  @Field(() => TaskStatus, { nullable: true })
  equals?: keyof typeof TaskStatus;

  @Field(() => [TaskStatus], { nullable: true })
  in?: Array<keyof typeof TaskStatus>;

  @Field(() => [TaskStatus], { nullable: true })
  notIn?: Array<keyof typeof TaskStatus>;

  @Field(() => NestedEnumTaskStatusFilter, { nullable: true })
  not?: NestedEnumTaskStatusFilter;
}
