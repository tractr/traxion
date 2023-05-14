import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { accessibleBy, PrismaQuery } from '@casl/prisma';
import { subject, PureAbility, ForcedSubject } from '@casl/ability';
import { PrismaService } from '@trxn/nestjs-database';
import { Action } from '@trxn/nestjs-casl';
import { RoleService, ROLE_SERVICE } from '../../nestjs-services';

@Injectable()
export class RoleAuthorizedService {
  constructor(
    @Inject(ROLE_SERVICE) private readonly roleService: RoleService,
    private readonly prisma: PrismaService,
  ) {}

  async findUnique<T extends Prisma.RoleFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleFindUniqueArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.RoleDelegate<undefined>,
  ) {
    const role = await this.roleService.findUnique<T>(args, prisma);
    if (role && abilities?.cannot(Action.Read, subject('Role', role)))
      throw new ForbiddenException('cannot read this user');
    return role;
  }

  async findMany<T extends Prisma.RoleFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleFindManyArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.RoleDelegate<undefined>,
  ) {
    const where = {
      AND: [abilities ? accessibleBy(abilities).Role : {}, args?.where ?? {}],
    };
    return this.roleService.findMany<T>({ ...args, where }, prisma);
  }

  async create<T extends Prisma.RoleCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleCreateArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.RoleDelegate<undefined>,
  ) {
    const create = async (client: Prisma.RoleDelegate<undefined>) => {
      const role = await this.roleService.create<T>(args, client);

      if (abilities?.cannot(Action.Create, subject('Role', role)))
        throw new ForbiddenException('cannot create Role');

      return role;
    };

    if (prisma) return create(prisma);
    return this.prisma.$transaction((client) => create(client.role));
  }

  async update<T extends Prisma.RoleUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleUpdateArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.RoleDelegate<undefined>,
  ) {
    const update = async (client: Prisma.RoleDelegate<undefined>) => {
      const role = await this.roleService.update<T>(args, client);

      if (abilities?.cannot(Action.Update, subject('Role', role)))
        throw new ForbiddenException('cannot update Role');

      return role;
    };

    if (prisma) return update(prisma);
    return this.prisma.$transaction((client) => update(client.role));
  }

  async delete<T extends Prisma.RoleDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleDeleteArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.RoleDelegate<undefined>,
  ) {
    const deleteCb = async (client: Prisma.RoleDelegate<undefined>) => {
      const role = await this.roleService.delete<T>(args, client);

      if (abilities?.cannot(Action.Delete, subject('Role', role)))
        throw new ForbiddenException('cannot delete Role');

      return role;
    };

    if (prisma) return deleteCb(prisma);
    return this.prisma.$transaction((client) => deleteCb(client.role));
  }

  async count<T extends Prisma.RoleCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleCountArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const where = {
      AND: [abilities ? accessibleBy(abilities).Role : {}, args?.where ?? {}],
    };
    return this.roleService.count<T>({ ...args, where });
  }
}
