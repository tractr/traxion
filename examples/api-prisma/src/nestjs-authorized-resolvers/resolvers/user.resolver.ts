import {
  User,
  Task,
  FindUniqueUserArgs,
  FindManyUserArgs,
  CreateOneUserArgs,
  UpdateOneUserArgs,
  DeleteOneUserArgs,
  FindManyTaskArgs,
} from '../../nestjs-graphql-dtos';
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
import { getPathFromGraphQLResolveInfo } from '@trxn/nestjs-graphql';
import { GraphQLResolveInfo } from 'graphql';
import { FindManyUserOutput } from '../dtos';
import {
  CREATE_USER,
  READ_USER,
  SEARCH_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../policies';
import { PrismaQuery } from '@casl/prisma';
import { PureAbility, ForcedSubject } from '@casl/ability';
import {
  UserAuthorizedService,
  TaskAuthorizedService,
  DefaultOwnershipSelect,
  DEFAULT_OWNERSHIP_SELECT,
} from '../../nestjs-authorized-services';
import { CurrentAbilities, Policies } from '@trxn/nestjs-core';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userAuthorizedService: UserAuthorizedService,
    private readonly taskAuthorizedService: TaskAuthorizedService,
    @Inject(DEFAULT_OWNERSHIP_SELECT)
    private readonly defaultFields: DefaultOwnershipSelect,
  ) {}

  /** Query for a unique user */
  @Query(() => User, { nullable: true })
  @Policies(READ_USER)
  async findUniqueUser(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueUserArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, { defaultFields: this.defaultFields })
      .value as Prisma.UserArgs;
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
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, {
      defaultFields: this.defaultFields,
    }).valueOf('users', 'User') as Prisma.UserArgs;

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
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, { defaultFields: this.defaultFields })
      .value as Prisma.UserArgs;

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
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, { defaultFields: this.defaultFields })
      .value as Prisma.UserArgs;

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
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, { defaultFields: this.defaultFields })
      .value as Prisma.UserArgs;

    const user = await this.userAuthorizedService.delete(
      { where, ...select },
      abilities,
    );

    return user;
  }

  @ResolveField(() => Task)
  async tasks(
    @Info() info: GraphQLResolveInfo,
    @Parent() user: User,
    @Args() findManyArgs: FindManyTaskArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    let { tasks } = user;

    if (typeof tasks === 'undefined') {
      const select = new PrismaSelect(info, {
        defaultFields: this.defaultFields,
      }).valueOf(
        getPathFromGraphQLResolveInfo(info.path),
        'Task',
      ) as Prisma.TaskArgs;

      const where: Prisma.TaskWhereInput = {
        AND: [
          {
            author: { id: user.id },
          },
          findManyArgs.where || {},
        ],
      };

      tasks = await this.taskAuthorizedService.findMany(
        {
          ...findManyArgs,
          where,
          ...select,
        },
        abilities,
      );
    }

    return tasks;
  }

  @ResolveField(() => Task)
  async sharedTasks(
    @Info() info: GraphQLResolveInfo,
    @Parent() user: User,
    @Args() findManyArgs: FindManyTaskArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    let { sharedTasks } = user;

    if (typeof sharedTasks === 'undefined') {
      const select = new PrismaSelect(info, {
        defaultFields: this.defaultFields,
      }).valueOf(
        getPathFromGraphQLResolveInfo(info.path),
        'Task',
      ) as Prisma.TaskArgs;

      const where: Prisma.TaskWhereInput = {
        AND: [
          {
            sharedWith: {
              some: {
                id: user.id,
              },
            },
          },
          findManyArgs.where || {},
        ],
      };

      sharedTasks = await this.taskAuthorizedService.findMany(
        {
          ...findManyArgs,
          where,
          ...select,
        },
        abilities,
      );
    }

    return sharedTasks;
  }
}
