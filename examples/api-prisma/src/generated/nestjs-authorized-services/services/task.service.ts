import { ForcedSubject, PureAbility, subject } from '@casl/ability';
import { accessibleBy, PrismaQuery } from '@casl/prisma';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { TASK_SERVICE, TaskService } from '../../nestjs-services';

import { Action } from '@trxn/nestjs-casl';
import { PrismaService } from '@trxn/nestjs-database';

@Injectable()
export class TaskAuthorizedService {
  constructor(
    @Inject(TASK_SERVICE) private readonly taskService: TaskService,
    private readonly prisma: PrismaService,
  ) {}

  async findUnique<
    T extends Prisma.TaskFindUniqueArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.TaskFindUniqueArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.TaskDelegate<undefined>,
  ) {
    const task = await this.taskService.findUnique<T, GlobalRejectSettings>(
      args,
      prisma,
    );
    if (task && abilities?.cannot(Action.Read, subject('Task', task)))
      throw new ForbiddenException('cannot read this user');
    return task;
  }

  async findMany<
    T extends Prisma.TaskFindManyArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.TaskFindManyArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.TaskDelegate<GlobalRejectSettings>,
  ) {
    const where = {
      AND: [abilities ? accessibleBy(abilities).Task : {}, args?.where ?? {}],
    };
    return this.taskService.findMany<T, GlobalRejectSettings>(
      { ...args, where },
      prisma,
    );
  }

  async create<
    T extends Prisma.TaskCreateArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.TaskCreateArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.TaskDelegate<GlobalRejectSettings>,
  ) {
    const create = async (client: Prisma.TaskDelegate<undefined>) => {
      const task = await this.taskService.create<T, GlobalRejectSettings>(
        args,
        client,
      );

      if (abilities?.cannot(Action.Create, subject('Task', task)))
        throw new ForbiddenException('cannot create Task');

      return task;
    };

    if (prisma) return create(prisma);
    return this.prisma.$transaction((client) => create(client.task));
  }

  async update<
    T extends Prisma.TaskUpdateArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.TaskUpdateArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.TaskDelegate<GlobalRejectSettings>,
  ) {
    const update = async (client: Prisma.TaskDelegate<undefined>) => {
      const task = await this.taskService.update<T, GlobalRejectSettings>(
        args,
        client,
      );

      if (abilities?.cannot(Action.Update, subject('Task', task)))
        throw new ForbiddenException('cannot update Task');

      return task;
    };

    if (prisma) return update(prisma);
    return this.prisma.$transaction((client) => update(client.task));
  }

  async delete<
    T extends Prisma.TaskDeleteArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.TaskDeleteArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.TaskDelegate<GlobalRejectSettings>,
  ) {
    const deleteCb = async (client: Prisma.TaskDelegate<undefined>) => {
      const task = await this.taskService.delete<T, GlobalRejectSettings>(
        args,
        client,
      );

      if (abilities?.cannot(Action.Delete, subject('Task', task)))
        throw new ForbiddenException('cannot delete Task');

      return task;
    };

    if (prisma) return deleteCb(prisma);
    return this.prisma.$transaction((client) => deleteCb(client.task));
  }

  async count<
    T extends Prisma.TaskCountArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.TaskCountArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const where = {
      AND: [abilities ? accessibleBy(abilities).Task : {}, args?.where ?? {}],
    };
    return this.taskService.count<T, GlobalRejectSettings>({ ...args, where });
  }
}
