import { Field, InputType } from '@nestjs/graphql';

import { RightWhereInput } from './right-where.input';

@InputType()
export class RightListRelationFilter {
  @Field(() => RightWhereInput, { nullable: true })
  every?: RightWhereInput;

  @Field(() => RightWhereInput, { nullable: true })
  some?: RightWhereInput;

  @Field(() => RightWhereInput, { nullable: true })
  none?: RightWhereInput;
}
