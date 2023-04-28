import { Inject } from '@nestjs/common';
import {
  Args,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { Prisma } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';

import {
  CREATE_RIGHT,
  READ_RIGHT,
  SEARCH_RIGHT,
  UPDATE_RIGHT,
  DELETE_RIGHT,
} from '../../casl-target';
import {
  Right,
  Role,
  FindUniqueRightArgs,
  FindManyRightArgs,
  CreateOneRightArgs,
  UpdateOneRightArgs,
  DeleteOneRightArgs,
} from '../../nestjs-graphql-dtos';
import { RightService, RIGHT_SERVICE } from '../../nestjs-services';
import { FindManyRightOutput } from '../dtos';

import { Policies } from '@trxn/nestjs-core';

@Resolver(() => Right)
export class RightResolver {
  constructor(
    @Inject(RIGHT_SERVICE) private readonly rightService: RightService,
  ) {}

  /** Query for a unique right */
  @Query(() => Right, { nullable: true })
  @Policies(READ_RIGHT)
  async findUniqueRight(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueRightArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RightArgs;
    const right = await this.rightService.findUnique({ where, ...select });
    return right;
  }

  /** Query for multiple rights. */
  @Query(() => FindManyRightOutput)
  @Policies(SEARCH_RIGHT)
  async findManyRights(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true })
    {
      where,
      cursor,
      distinct,
      orderBy = [{ id: 'asc' }],
      skip = 0,
      take = 100,
    }: FindManyRightArgs,
  ) {
    const select = new PrismaSelect(info).valueOf(
      'rights',
      'Right',
    ) as Prisma.RightArgs;

    const rights = await this.rightService.findMany({
      ...select,
      where,
      cursor,
      distinct,
      orderBy,
      skip,
      take: take + 1,
    });

    const count = await this.rightService.count({
      where,
    });

    return {
      rights: rights.slice(0, take),
      count,
      hasNextPage: typeof rights[take] !== 'undefined',
    };
  }

  /** Create a single right. */
  @Mutation(() => Right, { nullable: true })
  @Policies(CREATE_RIGHT)
  async createRight(
    @Info() info: GraphQLResolveInfo,
    @Args() { data }: CreateOneRightArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RightArgs;

    const right = await this.rightService.create({ data, ...select });

    return right;
  }

  /** Update a single right. */
  @Mutation(() => Right, { nullable: true })
  @Policies(UPDATE_RIGHT)
  async updateRight(
    @Info() info: GraphQLResolveInfo,
    @Args() { data, where }: UpdateOneRightArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RightArgs;

    const right = await this.rightService.update({ where, data, ...select });

    return right;
  }

  /** Delete a single Right. */
  @Mutation(() => Right, { nullable: true })
  @Policies(DELETE_RIGHT)
  async deleteRight(
    @Info() info: GraphQLResolveInfo,
    @Args() { where }: DeleteOneRightArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RightArgs;

    const right = await this.rightService.delete({ where, ...select });

    return right;
  }

  @ResolveField(() => Role)
  roles(@Parent() right: Right) {
    return right.roles;
  }
}