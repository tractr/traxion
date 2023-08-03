import { Field , InputType } from '@nestjs/graphql';

import { NullsOrder } from './nulls-order.enum';
import { SortOrder } from './sort-order.enum';

@InputType()
export class SortOrderInput {
  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => NullsOrder, { nullable: true })
  nulls?: keyof typeof NullsOrder;
}
