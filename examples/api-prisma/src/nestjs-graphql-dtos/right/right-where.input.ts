import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { RoleListRelationFilter } from '../role/role-list-relation-filter.input';

@InputType()
export class RightWhereInput {
  @Field(() => [RightWhereInput], { nullable: true })
  AND?: Array<RightWhereInput>;

  @Field(() => [RightWhereInput], { nullable: true })
  OR?: Array<RightWhereInput>;

  @Field(() => [RightWhereInput], { nullable: true })
  NOT?: Array<RightWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => RoleListRelationFilter, { nullable: true })
  roles?: RoleListRelationFilter;
}
