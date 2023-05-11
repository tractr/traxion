import { ForcedSubject, PureAbility } from '@casl/ability';
import { PrismaQuery } from '@casl/prisma';
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
  RightAuthorizedService,
  RoleAuthorizedService,
  UserAuthorizedService,
} from '../../nestjs-authorized-services';
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
import { FindManyRoleOutput } from '../dtos';
import {
  CREATE_ROLE,
  DELETE_ROLE,
  READ_ROLE,
  SEARCH_ROLE,
  UPDATE_ROLE,
} from '../policies';


import { CurrentAbilities, Policies } from '@trxn/nestjs-core';
import { getPathFromGraphQLResolveInfo } from '@trxn/nestjs-graphql';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    private readonly roleAuthorizedService: RoleAuthorizedService,
    private readonly userAuthorizedService: UserAuthorizedService,
    private readonly rightAuthorizedService: RightAuthorizedService,
  ) {}

  /** Query for a unique role */
  @Query(() => Role, { nullable: true })
  @Policies(READ_ROLE)
  async findUniqueRole(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueRoleArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RoleArgs;
    const role = await this.roleAuthorizedService.findUnique(
      { where, ...select },
      abilities,
    );
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
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info).valueOf(
      'roles',
      'Role',
    ) as Prisma.RoleArgs;

    const roles = await this.roleAuthorizedService.findMany(
      {
        ...select,
        where,
        cursor,
        distinct,
        orderBy,
        skip,
        take: take + 1,
      },
      abilities,
    );

    const count = await this.roleAuthorizedService.count(
      {
        where,
      },
      abilities,
    );

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
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RoleArgs;

    const role = await this.roleAuthorizedService.create(
      { data, ...select },
      abilities,
    );

    return role;
  }

  /** Update a single role. */
  @Mutation(() => Role, { nullable: true })
  @Policies(UPDATE_ROLE)
  async updateRole(
    @Info() info: GraphQLResolveInfo,
    @Args() { data, where }: UpdateOneRoleArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RoleArgs;

    const role = await this.roleAuthorizedService.update(
      { where, data, ...select },
      abilities,
    );

    return role;
  }

  /** Delete a single Role. */
  @Mutation(() => Role, { nullable: true })
  @Policies(DELETE_ROLE)
  async deleteRole(
    @Info() info: GraphQLResolveInfo,
    @Args() { where }: DeleteOneRoleArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RoleArgs;

    const role = await this.roleAuthorizedService.delete(
      { where, ...select },
      abilities,
    );

    return role;
  }

  @ResolveField(() => User)
  async users(
    @Info() info: GraphQLResolveInfo,
    @Parent() role: Role,
    @Args() findManyArgs: FindManyUserArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    let { users } = role;

    if (typeof users === 'undefined') {
      const select = new PrismaSelect(info, {
        // defaultFields: this.nestjsGraphqlModuleConfig.defaultFields,
      }).valueOf(
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

      users = await this.userAuthorizedService.findMany(
        {
          ...findManyArgs,
          where,
          ...select,
        },
        abilities,
      );
    }

    return users;
  }

  @ResolveField(() => Right)
  async rights(
    @Info() info: GraphQLResolveInfo,
    @Parent() role: Role,
    @Args() findManyArgs: FindManyRightArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    let { rights } = role;

    if (typeof rights === 'undefined') {
      const select = new PrismaSelect(info, {
        // defaultFields: this.nestjsGraphqlModuleConfig.defaultFields,
      }).valueOf(
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

      rights = await this.rightAuthorizedService.findMany(
        {
          ...findManyArgs,
          where,
          ...select,
        },
        abilities,
      );
    }

    return rights;
  }
}
