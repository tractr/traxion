import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { accessibleBy, PrismaQuery } from '@casl/prisma';
import { subject, PureAbility, ForcedSubject } from '@casl/ability';
import { PrismaService } from '@trxn/nestjs-database';
import { Action } from '@trxn/nestjs-casl';
import { TaskService, TASK_SERVICE } from '../../nestjs-services';

@Injectable()
export class TaskAuthorizedService {
  constructor(
    @Inject(TASK_SERVICE) private readonly taskService: TaskService,
    private readonly prisma: PrismaService,
  ) {}

  async findUnique<T extends Prisma.TaskFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskFindUniqueArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.TaskDelegate<undefined>,
  ) {
    const task = await this.taskService.findUnique<T>(args, prisma);
    if (task && abilities?.cannot(Action.Read, subject('Task', task)))
      throw new ForbiddenException('cannot read this user');
    return task;
  }

  async findMany<T extends Prisma.TaskFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskFindManyArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.TaskDelegate<undefined>,
  ) {
    const where = {
      AND: [abilities ? accessibleBy(abilities).Task : {}, args?.where ?? {}],
    };
    return this.taskService.findMany<T>({ ...args, where }, prisma);
  }

  async create<T extends Prisma.TaskCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskCreateArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.TaskDelegate<undefined>,
  ) {
    const create = async (client: Prisma.TaskDelegate<undefined>) => {
      const task = await this.taskService.create<T>(args, client);

      if (abilities?.cannot(Action.Create, subject('Task', task)))
        throw new ForbiddenException('cannot create Task');

      return task;
    };

    if (prisma) return create(prisma);
    return this.prisma.$transaction((client) => create(client.task));
  }

  async update<T extends Prisma.TaskUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskUpdateArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.TaskDelegate<undefined>,
  ) {
    const update = async (client: Prisma.TaskDelegate<undefined>) => {
      const task = await this.taskService.update<T>(args, client);

      if (abilities?.cannot(Action.Update, subject('Task', task)))
        throw new ForbiddenException('cannot update Task');

      return task;
    };

    if (prisma) return update(prisma);
    return this.prisma.$transaction((client) => update(client.task));
  }

  async delete<T extends Prisma.TaskDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskDeleteArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.TaskDelegate<undefined>,
  ) {
    const deleteCb = async (client: Prisma.TaskDelegate<undefined>) => {
      const task = await this.taskService.delete<T>(args, client);

      if (abilities?.cannot(Action.Delete, subject('Task', task)))
        throw new ForbiddenException('cannot delete Task');

      return task;
    };

    if (prisma) return deleteCb(prisma);
    return this.prisma.$transaction((client) => deleteCb(client.task));
  }

  async count<T extends Prisma.TaskCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.TaskCountArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const where = {
      AND: [abilities ? accessibleBy(abilities).Task : {}, args?.where ?? {}],
    };
    return this.taskService.count<T>({ ...args, where });
  }
}
