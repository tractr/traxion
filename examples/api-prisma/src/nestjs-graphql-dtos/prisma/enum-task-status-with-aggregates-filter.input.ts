import { Field , InputType } from '@nestjs/graphql';

import { NestedEnumTaskStatusFilter } from './nested-enum-task-status-filter.input';
import { NestedEnumTaskStatusWithAggregatesFilter } from './nested-enum-task-status-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { TaskStatus } from './task-status.enum';

@InputType()
export class EnumTaskStatusWithAggregatesFilter {
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
