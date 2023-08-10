import { Field, InputType, Int } from '@nestjs/graphql';

import { UserWhereInput } from './user-where.input';
import { EnumRoleNullableListFilter } from '../prisma/enum-role-nullable-list-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { ProfileNullableRelationFilter } from '../profile/profile-nullable-relation-filter.input';
import { TaskListRelationFilter } from '../task/task-list-relation-filter.input';

@InputType()
export class UserWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => [UserWhereInput], { nullable: true })
  AND?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  OR?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  NOT?: Array<UserWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  password?: StringFilter;

  @Field(() => EnumRoleNullableListFilter, { nullable: true })
  roles?: EnumRoleNullableListFilter;

  @Field(() => ProfileNullableRelationFilter, { nullable: true })
  profile?: ProfileNullableRelationFilter;

  @Field(() => TaskListRelationFilter, { nullable: true })
  tasks?: TaskListRelationFilter;

  @Field(() => TaskListRelationFilter, { nullable: true })
  sharedTasks?: TaskListRelationFilter;
}
