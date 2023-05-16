import {
  Task,
  User,
  FindUniqueTaskArgs,
  FindManyTaskArgs,
  CreateOneTaskArgs,
  UpdateOneTaskArgs,
  DeleteOneTaskArgs,
  FindManyUserArgs,
} from '../../nestjs-graphql-dtos';
import { TaskService, UserService } from '../../nestjs-services';
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
import { FindManyTaskOutput } from '../dtos';

@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  /** Query for a unique task */
  @Query(() => Task, { nullable: true })
  async findUniqueTask(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueTaskArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.TaskArgs;
    const task = await this.taskService.findUnique({ where, ...select });
    return task;
  }

  /** Query for multiple tasks. */
  @Query(() => FindManyTaskOutput)
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
  ) {
    const select = new PrismaSelect(info).valueOf(
      'tasks',
      'Task',
    ) as Prisma.TaskArgs;

    const tasks = await this.taskService.findMany({
      ...select,
      where,
      cursor,
      distinct,
      orderBy,
      skip,
      take: take + 1,
    });

    const count = await this.taskService.count({
      where,
    });

    return {
      tasks: tasks.slice(0, take),
      count,
      hasNextPage: typeof tasks[take] !== 'undefined',
    };
  }

  /** Create a single task. */
  @Mutation(() => Task, { nullable: true })
  async createTask(
    @Info() info: GraphQLResolveInfo,
    @Args() { data }: CreateOneTaskArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.TaskArgs;

    const task = await this.taskService.create({ data, ...select });

    return task;
  }

  /** Update a single task. */
  @Mutation(() => Task, { nullable: true })
  async updateTask(
    @Info() info: GraphQLResolveInfo,
    @Args() { data, where }: UpdateOneTaskArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.TaskArgs;

    const task = await this.taskService.update({ where, data, ...select });

    return task;
  }

  /** Delete a single Task. */
  @Mutation(() => Task, { nullable: true })
  async deleteTask(
    @Info() info: GraphQLResolveInfo,
    @Args() { where }: DeleteOneTaskArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.TaskArgs;

    const task = await this.taskService.delete({ where, ...select });

    return task;
  }

  @ResolveField(() => User)
  async author(@Info() info: GraphQLResolveInfo, @Parent() task: Task) {
    let { author } = task;

    if (typeof author === 'undefined') {
      if (!task.authorId) {
        throw new Error('author not found when fetching author');
      }

      const select = new PrismaSelect(info).valueOf(
        getPathFromGraphQLResolveInfo(info.path),
        'User',
      ) as Prisma.UserArgs;

      const findUnique = await this.userService.findUnique({
        where: { id: task.authorId },
        ...select,
      });

      author = findUnique || undefined;
    }

    return author;
  }

  @ResolveField(() => User)
  async sharedWith(
    @Info() info: GraphQLResolveInfo,
    @Parent() task: Task,
    @Args() findManyArgs: FindManyUserArgs,
  ) {
    let { sharedWith } = task;

    if (typeof sharedWith === 'undefined') {
      const select = new PrismaSelect(info).valueOf(
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

      sharedWith = await this.userService.findMany({
        ...findManyArgs,
        where,
        ...select,
      });
    }

    return sharedWith;
  }
}
