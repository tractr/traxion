import { Field , Int , ObjectType } from '@nestjs/graphql';

import { UserAvgAggregate } from './user-avg-aggregate.output';
import { UserCountAggregate } from './user-count-aggregate.output';
import { UserMaxAggregate } from './user-max-aggregate.output';
import { UserMinAggregate } from './user-min-aggregate.output';
import { UserSumAggregate } from './user-sum-aggregate.output';
import { Role } from '../prisma/role.enum';

@ObjectType()
export class UserGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => [Role], { nullable: true })
  roles?: Array<keyof typeof Role>;

  @Field(() => UserCountAggregate, { nullable: true })
  _count?: UserCountAggregate;

  @Field(() => UserAvgAggregate, { nullable: true })
  _avg?: UserAvgAggregate;

  @Field(() => UserSumAggregate, { nullable: true })
  _sum?: UserSumAggregate;

  @Field(() => UserMinAggregate, { nullable: true })
  _min?: UserMinAggregate;

  @Field(() => UserMaxAggregate, { nullable: true })
  _max?: UserMaxAggregate;
}
