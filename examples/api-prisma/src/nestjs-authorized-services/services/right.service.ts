import { AnyAbility, ForcedSubject, PureAbility , subject } from '@casl/ability';
import { accessibleBy, PrismaQuery } from '@casl/prisma';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { RIGHT_SERVICE, RightService } from '../../nestjs-services';

import { Action } from '@trxn/nestjs-casl';
import { PrismaService } from '@trxn/nestjs-database';


@Injectable()
export class RightAuthorizedService {
  constructor(
    @Inject(RIGHT_SERVICE) private readonly rightService: RightService,
    private readonly prisma: PrismaService,
  ) {}

  async findUnique<T extends Prisma.RightFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightFindUniqueArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.RightDelegate<undefined>,
  ) {
    const right = await this.rightService.findUnique<T>(args, prisma);
    if (right && abilities?.cannot(Action.Read, subject('Right', right)))
      throw new ForbiddenException('cannot read this user');
    return right;
  }

  async findMany<T extends Prisma.RightFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightFindManyArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.RightDelegate<undefined>,
  ) {
    const where = {
      AND: [abilities ? accessibleBy(abilities).Right : {}, args?.where ?? {}],
    };
    return this.rightService.findMany<T>({ ...args, where }, prisma);
  }

  async create<T extends Prisma.RightCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightCreateArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.RightDelegate<undefined>,
  ) {
    const create = async (client: Prisma.RightDelegate<undefined>) => {
      const right = await this.rightService.create<T>(args, client);

      if (abilities?.cannot(Action.Create, subject('Right', right)))
        throw new ForbiddenException('cannot create Right');

      return right;
    };

    if (prisma) return create(prisma);
    return this.prisma.$transaction((client) => create(client.right));
  }

  async update<T extends Prisma.RightUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightUpdateArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.RightDelegate<undefined>,
  ) {
    const update = async (client: Prisma.RightDelegate<undefined>) => {
      const right = await this.rightService.update<T>(args, client);

      if (abilities?.cannot(Action.Update, subject('Right', right)))
        throw new ForbiddenException('cannot update Right');

      return right;
    };

    if (prisma) return update(prisma);
    return this.prisma.$transaction((client) => update(client.right));
  }

  async delete<T extends Prisma.RightDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightDeleteArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.RightDelegate<undefined>,
  ) {
    const deleteCb = async (client: Prisma.RightDelegate<undefined>) => {
      const right = await this.rightService.delete<T>(args, client);

      if (abilities?.cannot(Action.Delete, subject('Right', right)))
        throw new ForbiddenException('cannot delete Right');

      return right;
    };

    if (prisma) return deleteCb(prisma);
    return this.prisma.$transaction((client) => deleteCb(client.right));
  }

  async count<T extends Prisma.RightCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightCountArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.RightDelegate<undefined>,
  ) {
    const where = {
      AND: [abilities ? accessibleBy(abilities).Right : {}, args?.where ?? {}],
    };
    return this.rightService.count<T>({ ...args, where });
  }
}
