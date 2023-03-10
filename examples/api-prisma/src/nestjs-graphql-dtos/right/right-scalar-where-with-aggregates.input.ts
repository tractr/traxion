import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class RightScalarWhereWithAggregatesInput {
  @Field(() => [RightScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<RightScalarWhereWithAggregatesInput>;

  @Field(() => [RightScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<RightScalarWhereWithAggregatesInput>;

  @Field(() => [RightScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<RightScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
