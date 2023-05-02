import {
  User,
  Role,
  FindUniqueUserArgs,
  FindManyUserArgs,
  CreateOneUserArgs,
  UpdateOneUserArgs,
  DeleteOneUserArgs,
} from '../../nestjs-graphql-dtos';
import { UserService, RoleService } from '../../nestjs-services';
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
import { FindManyUserOutput } from '../dtos';
import {
  CREATE_USER,
  READ_USER,
  SEARCH_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../../casl-target';
import { Policies } from '@trxn/nestjs-core';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  /** Query for a unique user */
  @Query(() => User, { nullable: true })
  @Policies(READ_USER)
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
  @Policies(SEARCH_USER)
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
  @Policies(CREATE_USER)
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
  @Policies(UPDATE_USER)
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
  @Policies(DELETE_USER)
  async deleteUser(
    @Info() info: GraphQLResolveInfo,
    @Args() { where }: DeleteOneUserArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.UserArgs;

    const user = await this.userService.delete({ where, ...select });

    return user;
  }

  @ResolveField(() => Role)
  async role(@Info() info: GraphQLResolveInfo, @Parent() user: User) {
    let { role } = user;

    if (typeof role === 'undefined') {
      if (!user.roleId) {
        throw new Error('roleId not found when fetching role');
      }

      const select = new PrismaSelect(info, {
        // defaultFields: OWNERS_DEFAULT_FIELDS,
      }).valueOf('role', 'Role') as Prisma.RoleArgs;

      const findUnique = await this.roleService.findUnique({
        where: { id: user.roleId },
        ...select,
      });

      role = findUnique || undefined;
    }

    return role;
  }
}
