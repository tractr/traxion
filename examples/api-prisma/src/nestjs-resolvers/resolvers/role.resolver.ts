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
  CreateOneRoleArgs,
  DeleteOneRoleArgs,
  FindManyRoleArgs,
  FindUniqueRoleArgs,
  Right,
  Role,
  UpdateOneRoleArgs,
  User,
} from '../../nestjs-graphql-dtos';
import { ROLE_SERVICE, RoleService } from '../../nestjs-services';
import { FindManyRoleOutput } from '../dtos';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    @Inject(ROLE_SERVICE) private readonly roleService: RoleService,
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
  users(@Parent() role: Role) {
    return role.users;
  }

  @ResolveField(() => Right)
  rights(@Parent() role: Role) {
    return role.rights;
  }
}
