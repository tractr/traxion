import { Field , InputType } from '@nestjs/graphql';

import { EnumTaskStatusWithAggregatesFilter } from '../prisma/enum-task-status-with-aggregates-filter.input';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class TaskScalarWhereWithAggregatesInput {
  @Field(() => [TaskScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<TaskScalarWhereWithAggregatesInput>;

  @Field(() => [TaskScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<TaskScalarWhereWithAggregatesInput>;

  @Field(() => [TaskScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<TaskScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  title?: StringWithAggregatesFilter;

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  description?: StringNullableWithAggregatesFilter;

  @Field(() => EnumTaskStatusWithAggregatesFilter, { nullable: true })
  status?: EnumTaskStatusWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  authorId?: IntWithAggregatesFilter;
}
