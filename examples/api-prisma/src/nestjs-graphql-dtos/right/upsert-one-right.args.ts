import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightCreateInput } from './right-create.input';
import { RightUpdateInput } from './right-update.input';
import { RightWhereUniqueInput } from './right-where-unique.input';

@ArgsType()
export class UpsertOneRightArgs {
  @Field(() => RightWhereUniqueInput, { nullable: false })
  @Type(() => RightWhereUniqueInput)
  where!: RightWhereUniqueInput;

  @Field(() => RightCreateInput, { nullable: false })
  @Type(() => RightCreateInput)
  create!: RightCreateInput;

  @Field(() => RightUpdateInput, { nullable: false })
  @Type(() => RightUpdateInput)
  update!: RightUpdateInput;
}
