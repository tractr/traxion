import { Field , InputType , Int } from '@nestjs/graphql';

import { TaskWhereInput } from './task-where.input';
import { EnumTaskStatusFilter } from '../prisma/enum-task-status-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { UserListRelationFilter } from '../user/user-list-relation-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';

@InputType()
export class TaskWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [TaskWhereInput], { nullable: true })
  AND?: Array<TaskWhereInput>;

  @Field(() => [TaskWhereInput], { nullable: true })
  OR?: Array<TaskWhereInput>;

  @Field(() => [TaskWhereInput], { nullable: true })
  NOT?: Array<TaskWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  description?: StringNullableFilter;

  @Field(() => EnumTaskStatusFilter, { nullable: true })
  status?: EnumTaskStatusFilter;

  @Field(() => IntFilter, { nullable: true })
  authorId?: IntFilter;

  @Field(() => UserRelationFilter, { nullable: true })
  author?: UserRelationFilter;

  @Field(() => UserListRelationFilter, { nullable: true })
  sharedWith?: UserListRelationFilter;
}
