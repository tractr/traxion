import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumTaskStatusFilter } from './nested-enum-task-status-filter.input';

@InputType()
export class NestedEnumTaskStatusWithAggregatesFilter {
  @Field(() => TaskStatus, { nullable: true })
  equals?: keyof typeof TaskStatus;

  @Field(() => [TaskStatus], { nullable: true })
  in?: Array<keyof typeof TaskStatus>;

  @Field(() => [TaskStatus], { nullable: true })
  notIn?: Array<keyof typeof TaskStatus>;

  @Field(() => NestedEnumTaskStatusWithAggregatesFilter, { nullable: true })
  not?: NestedEnumTaskStatusWithAggregatesFilter;

  @Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter;

  @Field(() => NestedEnumTaskStatusFilter, { nullable: true })
  _min?: NestedEnumTaskStatusFilter;

  @Field(() => NestedEnumTaskStatusFilter, { nullable: true })
  _max?: NestedEnumTaskStatusFilter;
}
