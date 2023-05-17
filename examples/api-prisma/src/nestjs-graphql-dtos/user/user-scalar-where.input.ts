import { Field , InputType } from '@nestjs/graphql';

import { EnumRoleNullableListFilter } from '../prisma/enum-role-nullable-list-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';

@InputType()
export class UserScalarWhereInput {
  @Field(() => [UserScalarWhereInput], { nullable: true })
  AND?: Array<UserScalarWhereInput>;

  @Field(() => [UserScalarWhereInput], { nullable: true })
  OR?: Array<UserScalarWhereInput>;

  @Field(() => [UserScalarWhereInput], { nullable: true })
  NOT?: Array<UserScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  email?: StringFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  name?: StringNullableFilter;

  @Field(() => EnumRoleNullableListFilter, { nullable: true })
  roles?: EnumRoleNullableListFilter;
}
