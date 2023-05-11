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
  CreateOneRoleArgs,
  DeleteOneRoleArgs,
  FindManyRightArgs,
  FindManyRoleArgs,
  FindManyUserArgs,
  FindUniqueRoleArgs,
  Right,
  Role,
  UpdateOneRoleArgs,
  User,
} from '../../nestjs-graphql-dtos';
import { RightService, RoleService, UserService } from '../../nestjs-services';
import { FindManyRoleOutput } from '../dtos';

import { getPathFromGraphQLResolveInfo } from '@trxn/nestjs-graphql';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly rightService: RightService,
  ) {}

  /** Query for a unique role */
  @Query(() => Role, { nullable: true })
  async findUniqueRole(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueRoleArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RoleArgs;
    const role = await this.roleService.findUnique({ where, ...select });
    return role;
  }

  /** Query for multiple roles. */
  @Query(() => FindManyRoleOutput)
  async findManyRoles(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true })
    {
      where,
      cursor,
      distinct,
      orderBy = [{ id: 'asc' }],
      skip = 0,
      take = 100,
    }: FindManyRoleArgs,
  ) {
    const select = new PrismaSelect(info).valueOf(
      'roles',
      'Role',
    ) as Prisma.RoleArgs;

    const roles = await this.roleService.findMany({
      ...select,
      where,
      cursor,
      distinct,
      orderBy,
      skip,
      take: take + 1,
    });

    const count = await this.roleService.count({
      where,
    });

    return {
      roles: roles.slice(0, take),
      count,
      hasNextPage: typeof roles[take] !== 'undefined',
    };
  }

  /** Create a single role. */
  @Mutation(() => Role, { nullable: true })
  async createRole(
    @Info() info: GraphQLResolveInfo,
    @Args() { data }: CreateOneRoleArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RoleArgs;

    const role = await this.roleService.create({ data, ...select });

    return role;
  }

  /** Update a single role. */
  @Mutation(() => Role, { nullable: true })
  async updateRole(
    @Info() info: GraphQLResolveInfo,
    @Args() { data, where }: UpdateOneRoleArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RoleArgs;

    const role = await this.roleService.update({ where, data, ...select });

    return role;
  }

  /** Delete a single Role. */
  @Mutation(() => Role, { nullable: true })
  async deleteRole(
    @Info() info: GraphQLResolveInfo,
    @Args() { where }: DeleteOneRoleArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RoleArgs;

    const role = await this.roleService.delete({ where, ...select });

    return role;
  }

  @ResolveField(() => User)
  async users(
    @Info() info: GraphQLResolveInfo,
    @Parent() role: Role,
    @Args() findManyArgs: FindManyUserArgs,
  ) {
    let { users } = role;

    if (typeof users === 'undefined') {
      const select = new PrismaSelect(info).valueOf(
        getPathFromGraphQLResolveInfo(info.path),
        'User',
      ) as Prisma.UserArgs;

      const where: Prisma.UserWhereInput = {
        AND: [
          {
            role: { id: role.id },
          },
          findManyArgs.where || {},
        ],
      };

      users = await this.userService.findMany({
        ...findManyArgs,
        where,
        ...select,
      });
    }

    return users;
  }

  @ResolveField(() => Right)
  async rights(
    @Info() info: GraphQLResolveInfo,
    @Parent() role: Role,
    @Args() findManyArgs: FindManyRightArgs,
  ) {
    let { rights } = role;

    if (typeof rights === 'undefined') {
      const select = new PrismaSelect(info).valueOf(
        getPathFromGraphQLResolveInfo(info.path),
        'Right',
      ) as Prisma.RightArgs;

      const where: Prisma.RightWhereInput = {
        AND: [
          {
            roles: {
              some: {
                id: role.id,
              },
            },
          },
          findManyArgs.where || {},
        ],
      };

      rights = await this.rightService.findMany({
        ...findManyArgs,
        where,
        ...select,
      });
    }

    return rights;
  }
}
