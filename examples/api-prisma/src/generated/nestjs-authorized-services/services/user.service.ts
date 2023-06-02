import { ForcedSubject, PureAbility, subject } from '@casl/ability';
import { accessibleBy, PrismaQuery } from '@casl/prisma';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { USER_SERVICE, UserService } from '../../nestjs-services';

import { Action } from '@trxn/nestjs-casl';
import { PrismaService } from '@trxn/nestjs-database';

@Injectable()
export class UserAuthorizedService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  async findUnique<
    T extends Prisma.UserFindUniqueArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.UserDelegate<undefined>,
  ) {
    const user = await this.userService.findUnique<T, GlobalRejectSettings>(
      args,
      prisma,
    );
    if (user && abilities?.cannot(Action.Read, subject('User', user)))
      throw new ForbiddenException('cannot read this user');
    return user;
  }

  async findMany<
    T extends Prisma.UserFindManyArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.UserDelegate<GlobalRejectSettings>,
  ) {
    const where = {
      AND: [abilities ? accessibleBy(abilities).User : {}, args?.where ?? {}],
    };
    return this.userService.findMany<T, GlobalRejectSettings>(
      { ...args, where },
      prisma,
    );
  }

  async create<
    T extends Prisma.UserCreateArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.UserDelegate<GlobalRejectSettings>,
  ) {
    const create = async (client: Prisma.UserDelegate<undefined>) => {
      const user = await this.userService.create<T, GlobalRejectSettings>(
        args,
        client,
      );

      if (abilities?.cannot(Action.Create, subject('User', user)))
        throw new ForbiddenException('cannot create User');

      return user;
    };

    if (prisma) return create(prisma);
    return this.prisma.$transaction((client) => create(client.user));
  }

  async update<
    T extends Prisma.UserUpdateArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.UserDelegate<GlobalRejectSettings>,
  ) {
    const update = async (client: Prisma.UserDelegate<undefined>) => {
      const user = await this.userService.update<T, GlobalRejectSettings>(
        args,
        client,
      );

      if (abilities?.cannot(Action.Update, subject('User', user)))
        throw new ForbiddenException('cannot update User');

      return user;
    };

    if (prisma) return update(prisma);
    return this.prisma.$transaction((client) => update(client.user));
  }

  async delete<
    T extends Prisma.UserDeleteArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.UserDelegate<GlobalRejectSettings>,
  ) {
    const deleteCb = async (client: Prisma.UserDelegate<undefined>) => {
      const user = await this.userService.delete<T, GlobalRejectSettings>(
        args,
        client,
      );

      if (abilities?.cannot(Action.Delete, subject('User', user)))
        throw new ForbiddenException('cannot delete User');

      return user;
    };

    if (prisma) return deleteCb(prisma);
    return this.prisma.$transaction((client) => deleteCb(client.user));
  }

  async count<
    T extends Prisma.UserCountArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.UserCountArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const where = {
      AND: [abilities ? accessibleBy(abilities).User : {}, args?.where ?? {}],
    };
    return this.userService.count<T, GlobalRejectSettings>({ ...args, where });
  }
}
