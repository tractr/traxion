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
  CreateOneUserArgs,
  DeleteOneUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  Role,
  UpdateOneUserArgs,
  User,
} from '../../nestjs-graphql-dtos';
import { USER_SERVICE, UserService } from '../../nestjs-services';
import { FindManyUserOutput } from '../dtos';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) {}

  /** Query for a unique user */
  @Query(() => User, { nullable: true })
  async findUniqueUser(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueUserArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.UserArgs;
    const user = await this.userService.findUnique({ where, ...select });
    return user;
  }

  /** Query for multiple users. */
  @Query(() => FindManyUserOutput)
  async findManyUsers(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true })
    {
      where,
      cursor,
      distinct,
      orderBy = [{ id: 'asc' }],
      skip = 0,
      take = 100,
    }: FindManyUserArgs,
  ) {
    const select = new PrismaSelect(info).valueOf(
      'users',
      'User',
    ) as Prisma.UserArgs;

    const users = await this.userService.findMany({
      ...select,
      where,
      cursor,
      distinct,
      orderBy,
      skip,
      take: take + 1,
    });

    const count = await this.userService.count({
      where,
    });

    return {
      users: users.slice(0, take),
      count,
      hasNextPage: typeof users[take] !== 'undefined',
    };
  }

  /** Create a single user. */
  @Mutation(() => User, { nullable: true })
  async createUser(
    @Info() info: GraphQLResolveInfo,
    @Args() { data }: CreateOneUserArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.UserArgs;

    const user = await this.userService.create({ data, ...select });

    return user;
  }

  /** Update a single user. */
  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Info() info: GraphQLResolveInfo,
    @Args() { data, where }: UpdateOneUserArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.UserArgs;

    const user = await this.userService.update({ where, data, ...select });

    return user;
  }

  /** Delete a single User. */
  @Mutation(() => User, { nullable: true })
  async deleteUser(
    @Info() info: GraphQLResolveInfo,
    @Args() { where }: DeleteOneUserArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.UserArgs;

    const user = await this.userService.delete({ where, ...select });

    return user;
  }

  @ResolveField(() => Role)
  role(@Parent() user: User) {
    return user.role;
  }
}
