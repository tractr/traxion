import { ForcedSubject, PureAbility } from '@casl/ability';
import { PrismaQuery } from '@casl/prisma';
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
  DEFAULT_OWNERSHIP_SELECT,
  DefaultOwnershipSelect,
  TaskAuthorizedService,
  UserAuthorizedService,
} from '../../nestjs-authorized-services';
import {
  CreateOneTaskArgs,
  DeleteOneTaskArgs,
  FindManyTaskArgs,
  FindManyUserArgs,
  FindUniqueTaskArgs,
  Task,
  UpdateOneTaskArgs,
  User,
} from '../../nestjs-graphql-dtos';
import { FindManyTaskOutput } from '../dtos';
import {
  CREATE_TASK,
  DELETE_TASK,
  READ_TASK,
  SEARCH_TASK,
  UPDATE_TASK,
} from '../policies';


import { CurrentAbilities, Policies } from '@trxn/nestjs-core';
import { getPathFromGraphQLResolveInfo } from '@trxn/nestjs-graphql';

@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly taskAuthorizedService: TaskAuthorizedService,
    private readonly userAuthorizedService: UserAuthorizedService,
    @Inject(DEFAULT_OWNERSHIP_SELECT)
    private readonly defaultFields: DefaultOwnershipSelect,
  ) {}

  /** Query for a unique task */
  @Query(() => Task, { nullable: true })
  @Policies(READ_TASK)
  async findUniqueTask(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueTaskArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, { defaultFields: this.defaultFields })
      .value as Prisma.TaskArgs;
    const task = await this.taskAuthorizedService.findUnique(
      { where, ...select },
      abilities,
    );
    return task;
  }

  /** Query for multiple tasks. */
  @Query(() => FindManyTaskOutput)
  @Policies(SEARCH_TASK)
  async findManyTasks(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true })
    {
      where,
      cursor,
      distinct,
      orderBy = [{ id: 'asc' }],
      skip = 0,
      take = 100,
    }: FindManyTaskArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, {
      defaultFields: this.defaultFields,
    }).valueOf('tasks', 'Task') as Prisma.TaskArgs;

    const tasks = await this.taskAuthorizedService.findMany(
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

    const count = await this.taskAuthorizedService.count(
      {
        where,
      },
      abilities,
    );

    return {
      tasks: tasks.slice(0, take),
      count,
      hasNextPage: typeof tasks[take] !== 'undefined',
    };
  }

  /** Create a single task. */
  @Mutation(() => Task, { nullable: true })
  @Policies(CREATE_TASK)
  async createTask(
    @Info() info: GraphQLResolveInfo,
    @Args() { data }: CreateOneTaskArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, { defaultFields: this.defaultFields })
      .value as Prisma.TaskArgs;

    const task = await this.taskAuthorizedService.create(
      { data, ...select },
      abilities,
    );

    return task;
  }

  /** Update a single task. */
  @Mutation(() => Task, { nullable: true })
  @Policies(UPDATE_TASK)
  async updateTask(
    @Info() info: GraphQLResolveInfo,
    @Args() { data, where }: UpdateOneTaskArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, { defaultFields: this.defaultFields })
      .value as Prisma.TaskArgs;

    const task = await this.taskAuthorizedService.update(
      { where, data, ...select },
      abilities,
    );

    return task;
  }

  /** Delete a single Task. */
  @Mutation(() => Task, { nullable: true })
  @Policies(DELETE_TASK)
  async deleteTask(
    @Info() info: GraphQLResolveInfo,
    @Args() { where }: DeleteOneTaskArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, { defaultFields: this.defaultFields })
      .value as Prisma.TaskArgs;

    const task = await this.taskAuthorizedService.delete(
      { where, ...select },
      abilities,
    );

    return task;
  }

  @ResolveField(() => User)
  async author(
    @Info() info: GraphQLResolveInfo,
    @Parent() task: Task,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    let { author } = task;

    if (typeof author === 'undefined') {
      if (!task.authorId) {
        throw new Error('author not found when fetching author');
      }

      const select = new PrismaSelect(info, {
        defaultFields: this.defaultFields,
      }).valueOf(
        getPathFromGraphQLResolveInfo(info.path),
        'User',
      ) as Prisma.UserArgs;

      const findUnique = await this.userAuthorizedService.findUnique(
        {
          where: { id: task.authorId },
          ...select,
        },
        abilities,
      );

      author = findUnique || undefined;
    }

    return author;
  }

  @ResolveField(() => User)
  async sharedWith(
    @Info() info: GraphQLResolveInfo,
    @Parent() task: Task,
    @Args() findManyArgs: FindManyUserArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    let { sharedWith } = task;

    if (typeof sharedWith === 'undefined') {
      const select = new PrismaSelect(info, {
        defaultFields: this.defaultFields,
      }).valueOf(
        getPathFromGraphQLResolveInfo(info.path),
        'User',
      ) as Prisma.UserArgs;

      const where: Prisma.UserWhereInput = {
        AND: [
          {
            sharedTasks: {
              some: {
                id: task.id,
              },
            },
          },
          findManyArgs.where || {},
        ],
      };

      sharedWith = await this.userAuthorizedService.findMany(
        {
          ...findManyArgs,
          where,
          ...select,
        },
        abilities,
      );
    }

    return sharedWith;
  }
}
