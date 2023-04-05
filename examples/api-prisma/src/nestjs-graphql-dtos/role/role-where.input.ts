import { Field, InputType } from '@nestjs/graphql';

import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { RightListRelationFilter } from '../right/right-list-relation-filter.input';
import { UserListRelationFilter } from '../user/user-list-relation-filter.input';

@InputType()
export class RoleWhereInput {
  @Field(() => [RoleWhereInput], { nullable: true })
  AND?: Array<RoleWhereInput>;

  @Field(() => [RoleWhereInput], { nullable: true })
  OR?: Array<RoleWhereInput>;

  @Field(() => [RoleWhereInput], { nullable: true })
  NOT?: Array<RoleWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => UserListRelationFilter, { nullable: true })
  users?: UserListRelationFilter;

  @Field(() => RightListRelationFilter, { nullable: true })
  rights?: RightListRelationFilter;
}
