import { AnyAbility } from '@casl/ability';
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
  ProfileAuthorizedService,
  RoleAuthorizedService,
  UserAuthorizedService,
} from '../../nestjs-authorized-services';
import {
  CreateOneUserArgs,
  DeleteOneUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  Profile,
  Role,
  UpdateOneUserArgs,
  User,
} from '../../nestjs-graphql-dtos';
import { FindManyUserOutput } from '../dtos';
import {
  CREATE_USER,
  DELETE_USER,
  READ_USER,
  SEARCH_USER,
  UPDATE_USER,
} from '../policies';

import { CurrentAbilities, Policies } from '@trxn/nestjs-core';
import { getPathFromGraphQLResolveInfo } from '@trxn/nestjs-graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userAuthorizedService: UserAuthorizedService,
    private readonly roleAuthorizedService: RoleAuthorizedService,
    private readonly profileAuthorizedService: ProfileAuthorizedService,
  ) {}

  /** Query for a unique user */
  @Query(() => User, { nullable: true })
  @Policies(READ_USER)
  async findUniqueUser(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueUserArgs,
    @CurrentAbilities() abilities: AnyAbility,
  ) {
    const select = new PrismaSelect(info).value as Prisma.UserArgs;
    const user = await this.userAuthorizedService.findUnique(
      { where, ...select },
      abilities,
    );
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
    @CurrentAbilities() abilities: AnyAbility,
  ) {
    const select = new PrismaSelect(info).valueOf(
      'users',
      'User',
    ) as Prisma.UserArgs;

    const users = await this.userAuthorizedService.findMany(
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

    const count = await this.userAuthorizedService.count(
      {
        where,
      },
      abilities,
    );

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
    @CurrentAbilities() abilities: AnyAbility,
  ) {
    const select = new PrismaSelect(info).value as Prisma.UserArgs;

    const user = await this.userAuthorizedService.create(
      { data, ...select },
      abilities,
    );

    return user;
  }

  /** Update a single user. */
  @Mutation(() => User, { nullable: true })
  @Policies(UPDATE_USER)
  async updateUser(
    @Info() info: GraphQLResolveInfo,
    @Args() { data, where }: UpdateOneUserArgs,
    @CurrentAbilities() abilities: AnyAbility,
  ) {
    const select = new PrismaSelect(info).value as Prisma.UserArgs;

    const user = await this.userAuthorizedService.update(
      { where, data, ...select },
      abilities,
    );

    return user;
  }

  /** Delete a single User. */
  @Mutation(() => User, { nullable: true })
  @Policies(DELETE_USER)
  async deleteUser(
    @Info() info: GraphQLResolveInfo,
    @Args() { where }: DeleteOneUserArgs,
    @CurrentAbilities() abilities: AnyAbility,
  ) {
    const select = new PrismaSelect(info).value as Prisma.UserArgs;

    const user = await this.userAuthorizedService.delete(
      { where, ...select },
      abilities,
    );

    return user;
  }

  @ResolveField(() => Role)
  async role(
    @Info() info: GraphQLResolveInfo,
    @Parent() user: User,
    @CurrentAbilities() abilities: AnyAbility,
  ) {
    let { role } = user;

    if (typeof role === 'undefined') {
      if (!user.roleId) {
        throw new Error('role not found when fetching role');
      }

      const select = new PrismaSelect(info, {
        // defaultFields: OWNERS_DEFAULT_FIELDS,
      }).valueOf(
        getPathFromGraphQLResolveInfo(info.path),
        'Role',
      ) as Prisma.RoleArgs;

      const findUnique = await this.roleAuthorizedService.findUnique(
        {
          where: { id: user.roleId },
          ...select,
        },
        abilities,
      );

      role = findUnique || undefined;
    }

    return role;
  }

  @ResolveField(() => Profile)
  async userProfile(
    @Info() info: GraphQLResolveInfo,
    @Parent() user: User,
    @CurrentAbilities() abilities: AnyAbility,
  ) {
    let { userProfile } = user;

    if (typeof userProfile === 'undefined') {
      const select = new PrismaSelect(info, {
        // defaultFields: OWNERS_DEFAULT_FIELDS,
      }).valueOf(
        getPathFromGraphQLResolveInfo(info.path),
        'Profile',
      ) as Prisma.ProfileArgs;

      const findUnique = await this.profileAuthorizedService.findUnique(
        {
          where: { userId: user.id },
          ...select,
        },
        abilities,
      );

      userProfile = findUnique || undefined;
    }

    return userProfile;
  }
}
