import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RoleAvgAggregateInput } from './role-avg-aggregate.input';
import { RoleCountAggregateInput } from './role-count-aggregate.input';
import { RoleMaxAggregateInput } from './role-max-aggregate.input';
import { RoleMinAggregateInput } from './role-min-aggregate.input';
import { RoleOrderByWithRelationInput } from './role-order-by-with-relation.input';
import { RoleSumAggregateInput } from './role-sum-aggregate.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { RoleWhereInput } from './role-where.input';

@ArgsType()
export class RoleAggregateArgs {
  @Field(() => RoleWhereInput, { nullable: true })
  @Type(() => RoleWhereInput)
  where?: RoleWhereInput;

  @Field(() => [RoleOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<RoleOrderByWithRelationInput>;

  @Field(() => RoleWhereUniqueInput, { nullable: true })
  cursor?: RoleWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => RoleCountAggregateInput, { nullable: true })
  _count?: RoleCountAggregateInput;

  @Field(() => RoleAvgAggregateInput, { nullable: true })
  _avg?: RoleAvgAggregateInput;

  @Field(() => RoleSumAggregateInput, { nullable: true })
  _sum?: RoleSumAggregateInput;

  @Field(() => RoleMinAggregateInput, { nullable: true })
  _min?: RoleMinAggregateInput;

  @Field(() => RoleMaxAggregateInput, { nullable: true })
  _max?: RoleMaxAggregateInput;
}
