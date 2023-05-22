import { Field, InputType } from '@nestjs/graphql';

import { EnumRoleNullableListFilter } from '../prisma/enum-role-nullable-list-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { ProfileRelationFilter } from '../profile/profile-relation-filter.input';
import { TaskListRelationFilter } from '../task/task-list-relation-filter.input';

@InputType()
export class UserWhereInput {
  @Field(() => [UserWhereInput], { nullable: true })
  AND?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  OR?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  NOT?: Array<UserWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  email?: StringFilter;

  @Field(() => EnumRoleNullableListFilter, { nullable: true })
  roles?: EnumRoleNullableListFilter;

  @Field(() => ProfileRelationFilter, { nullable: true })
  profile?: ProfileRelationFilter;

  @Field(() => TaskListRelationFilter, { nullable: true })
  tasks?: TaskListRelationFilter;

  @Field(() => TaskListRelationFilter, { nullable: true })
  sharedTasks?: TaskListRelationFilter;
}
