import {
  Role,
  User,
  Right,
  FindUniqueRoleArgs,
  FindManyRoleArgs,
  CreateOneRoleArgs,
  UpdateOneRoleArgs,
  DeleteOneRoleArgs,
  FindManyUserArgs,
  FindManyRightArgs,
} from '../../nestjs-graphql-dtos';
import { RoleService, UserService, RightService } from '../../nestjs-services';
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
import { FindManyRoleOutput } from '../dtos';
import {
  CREATE_ROLE,
  READ_ROLE,
  SEARCH_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
} from '../../casl-target';
import { Policies } from '@trxn/nestjs-core';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly rightService: RightService,
  ) {}

  /** Query for a unique role */
  @Query(() => Role, { nullable: true })
  @Policies(READ_ROLE)
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
  @Policies(SEARCH_ROLE)
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
  @Policies(CREATE_ROLE)
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
  @Policies(UPDATE_ROLE)
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
  @Policies(DELETE_ROLE)
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
      const select = new PrismaSelect(info, {
        // defaultFields: OWNERS_DEFAULT_FIELDS,
      }).valueOf('roles.users', 'User') as Prisma.UserArgs;

      users = await this.userService.findMany({
        ...findManyArgs,
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
      const select = new PrismaSelect(info, {
        // defaultFields: OWNERS_DEFAULT_FIELDS,
      }).valueOf('roles.rights', 'Right') as Prisma.RightArgs;

      rights = await this.rightService.findMany({
        ...findManyArgs,
        ...select,
      });
    }

    return rights;
  }
}
