import { Field, InputType } from '@nestjs/graphql';

import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class RightScalarWhereInput {
  @Field(() => [RightScalarWhereInput], { nullable: true })
  AND?: Array<RightScalarWhereInput>;

  @Field(() => [RightScalarWhereInput], { nullable: true })
  OR?: Array<RightScalarWhereInput>;

  @Field(() => [RightScalarWhereInput], { nullable: true })
  NOT?: Array<RightScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;
}
