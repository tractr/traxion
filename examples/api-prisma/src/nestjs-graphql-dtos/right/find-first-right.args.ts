import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RightWhereInput } from './right-where.input';
import { Type } from 'class-transformer';
import { RightOrderByWithRelationInput } from './right-order-by-with-relation.input';
import { RightWhereUniqueInput } from './right-where-unique.input';
import { Int } from '@nestjs/graphql';
import { RightScalarFieldEnum } from './right-scalar-field.enum';

@ArgsType()
export class FindFirstRightArgs {
  @Field(() => RightWhereInput, { nullable: true })
  @Type(() => RightWhereInput)
  where?: RightWhereInput;

  @Field(() => [RightOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<RightOrderByWithRelationInput>;

  @Field(() => RightWhereUniqueInput, { nullable: true })
  cursor?: RightWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [RightScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof RightScalarFieldEnum>;
}
