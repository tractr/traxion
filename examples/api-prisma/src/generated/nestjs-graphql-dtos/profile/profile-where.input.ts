import { Field, InputType } from '@nestjs/graphql';

import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';

@InputType()
export class ProfileWhereInput {
  @Field(() => [ProfileWhereInput], { nullable: true })
  AND?: Array<ProfileWhereInput>;

  @Field(() => [ProfileWhereInput], { nullable: true })
  OR?: Array<ProfileWhereInput>;

  @Field(() => [ProfileWhereInput], { nullable: true })
  NOT?: Array<ProfileWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  firstName?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  lastName?: StringFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  bio?: StringNullableFilter;

  @Field(() => IntFilter, { nullable: true })
  userId?: IntFilter;

  @Field(() => UserRelationFilter, { nullable: true })
  user?: UserRelationFilter;
}
