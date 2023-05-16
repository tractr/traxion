import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@trxn/nestjs-database';

@Injectable()
export class TaskService {
  constructor(private readonly prismaClient: PrismaService) {}

  /**
   *     Find zero or one Task that matches the filter.
   *     @param {TaskFindUniqueArgs} args - Arguments to find a Task
   *     @example
   *     // Get one Task
   *     const task = await this.taskService.findUnique({
   *       where: {
   *         // ... provide filter here
   *       }
   *     })
   *
   */
  async findUnique<T extends Prisma.TaskFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskFindUniqueArgs>,
    prisma: Prisma.TaskDelegate<undefined> = this.prismaClient.task,
  ) {
    const task = await prisma.findUnique<T>(args);

    return task;
  }

  /**
   *        Find the first Task that matches the filter.
   *        Note, that providing 'undefined' is treated as the value not being there.
   *        Read more here: https://pris.ly/d/null-undefined
   *        @param {TaskFindFirstArgs} args - Arguments to find a Task
   *        @example
   *        // Get one Task
   *        const task = await this.taskService.findFirst({
   *          where: {
   *            // ... provide filter here
   *          }
   *        })
   *
   */
  async findFirst<T extends Prisma.TaskFindFirstArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskFindFirstArgs>,
    prisma: Prisma.TaskDelegate<undefined> = this.prismaClient.task,
  ) {
    const task = await prisma.findFirst<T>(args);

    return task;
  }

  /**
   *        Find zero or more Tasks that matches the filter.
   *        Note, that providing 'undefined' is treated as the value not being there.
   *        Read more here: https://pris.ly/d/null-undefined
   *        @param {TaskFindManyArgs=} args - Arguments to filter and select certain fields only.
   *        @example
   *        // Get all Tasks
   *        const tasks = await this.taskService.findMany()
   *
   *        // Get first 10 Tasks
   *        const Tasks = await this.TaskService.findMany({ take: 10 })
   *
   *        // Only select the 'id'
   *        const taskWithIdOnly = await this.TaskService.findMany({ select: { id: true } })
   *
   *
   */
  async findMany<T extends Prisma.TaskFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskFindManyArgs>,
    prisma: Prisma.TaskDelegate<undefined> = this.prismaClient.task,
  ) {
    const tasks = await prisma.findMany<T>(args);

    return tasks;
  }

  /**
   *       Create a Task.
   *       @param {TaskCreateArgs} args - Arguments to create a Task.
   *       @example
   *       // Create one Task
   *       const Task = await this.taskService.create({
   *         data: {
   *           // ... data to create a Task
   *         }
   *       })
   */
  async create<T extends Prisma.TaskCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskCreateArgs>,
    prisma: Prisma.TaskDelegate<undefined> = this.prismaClient.task,
  ) {
    const task = await prisma.create<T>(args);

    return task;
  }

  /**
   *         Create many Tasks.
   *         @param {TaskCreateManyArgs} args - Arguments to create many a
   *         Tasks.
   *         @example
   *         // Create many Tasks
   *         const Tasks = await this.taskService.createMany({
   *           data: {
   *             *     // ... provide data here
   *           }
   *         })
   */
  async createMany<T extends Prisma.TaskCreateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskCreateManyArgs>,
    prisma: Prisma.TaskDelegate<undefined> = this.prismaClient.task,
  ) {
    return prisma.createMany<T>(args);
  }

  /**
   *        Update a Task.
   *        @param {TaskUpdateArgs} args - Arguments to update a Task.
   *        @example
   *        // Update one Task
   *        const task = await this.taskService.update({
   *          where: {
   *            // ... provide filter here
   *          },
   *          data: {
   *            // ... provide data here
   *          }
   *        })
   *
   */
  async update<T extends Prisma.TaskUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskUpdateArgs>,
    prisma: Prisma.TaskDelegate<undefined> = this.prismaClient.task,
  ) {
    const task = await prisma.update<T>(args);

    return task;
  }

  /**
   *        Update 0 or more Tasks.
   *        Note, that providing 'undefined' is treated as the value not being there.
   *        Read more here: https://pris.ly/d/null-undefined
   *        @param {TaskUpdateManyArgs} args - Arguments to update one or more Tasks.
   *        @example
   *        // Update many Tasks
   *        const tasks = await this.taskService.updateMany({
   *          where: {
   *            // ... provide filter here
   *          },
   *          data: {
   *            // ... provide data here
   *          }
   *        })
   *
   */
  async updateMany<T extends Prisma.TaskUpdateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskUpdateManyArgs>,
    prisma: Prisma.TaskDelegate<undefined> = this.prismaClient.task,
  ) {
    return prisma.updateMany<T>(args);
  }

  /**
   *       Create or update one Task.
   *        @param {TaskUpsertArgs} args - Arguments to update or create a Task.
   *        @example
   *        // Upsert one Task
   *        const task = await this.taskService.upsert({
   *          create: {
   *            // ... data to create a Task
   *          },
   *          update: {
   *            // ... in case it already exists, update
   *          },
   *          where: {
   *            // ... the filter for the Task we want to update
   *          }
   *        })
   *
   */
  async upsert<T extends Prisma.TaskUpsertArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskUpsertArgs>,
    prisma: Prisma.TaskDelegate<undefined> = this.prismaClient.task,
  ) {
    const task = await prisma.upsert<T>(args);

    return task;
  }

  /**
   *     Delete a Task.
   *     @param {TaskDeleteArgs} args - Arguments to delete a Task
   *     @example
   *     // Delete one Task
   *     const task = await this.taskService.delete({
   *       where: {
   *         // ... filter to delete one Task
   *       }
   *     })
   *
   */
  async delete<T extends Prisma.TaskDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskDeleteArgs>,
    prisma: Prisma.TaskDelegate<undefined> = this.prismaClient.task,
  ) {
    const task = await prisma.delete<T>(args);

    return task;
  }

  /**
   *     Delete 0 or more Tasks.
   *     @param {TaskDeleteArgs} args - Arguments to filter  Tasks to delete.
   *     @example
   *     // Delete a few Tasks
   *     const tasks = await this.taskService.deleteMany({
   *       where: {
   *         // ... provide filter here
   *       }
   *     })
   *
   */
  async deleteMany<T extends Prisma.TaskDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskDeleteManyArgs>,
    prisma: Prisma.TaskDelegate<undefined> = this.prismaClient.task,
  ) {
    return prisma.deleteMany<T>(args);
  }

  /**
   *       Count the number of Task.
   *       Note, that providing 'undefined' is treated as the value not being there.
   *       Read more here: https://pris.ly/d/null-undefined
   *       @param {TaskCountArgs} args - Arguments to filter Tasks to count.
   *       @example
   *       // Count one Task
   *       const Task = await this.taskService.count({
   *         data: {
   *           // ... data to count a Task
   *         }
   *       })
   *
   *
   */
  async count<T extends Prisma.TaskCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskCountArgs>,
    prisma: Prisma.TaskDelegate<undefined> = this.prismaClient.task,
  ) {
    return prisma.count<T>(args);
  }

  /**
   *         Allows you to perform aggregations operations on a Task.
   *         Note, that providing 'undefined' is treated as the value not being there.
   *         Read more here: https://pris.ly/d/null-undefined
   *         @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
   *         @example
   *         // Ordered by age ascending
   *         // Where email contains prisma.io
   *         // Limited to the 10 tasks
   *         const aggregations = await this.taskService.aggregate({
   *           avg: {
   *             age: true,
   *           },
   *           where: {
   *             email: {
   *               contains: "prisma.io",
   *             },
   *           },
   *           orderBy: {
   *             age: "asc",
   *           },
   *           take: 10,
   *         })
   *
   */
  async aggregate<T extends Prisma.TaskAggregateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskAggregateArgs>,
    prisma: Prisma.TaskDelegate<undefined> = this.prismaClient.task,
  ) {
    return prisma.aggregate<T>(args);
  }
}
