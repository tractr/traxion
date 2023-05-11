import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RightWhereUniqueInput } from './right-where-unique.input';
import { Type } from 'class-transformer';
import { RightCreateInput } from './right-create.input';
import { RightUpdateInput } from './right-update.input';

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
