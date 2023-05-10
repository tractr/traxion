import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { accessibleBy } from '@casl/prisma';
import { subject } from '@casl/ability';
import { PrismaService } from '@trxn/nestjs-database';
import { Action } from '@trxn/nestjs-casl';
import { ProfileService, PROFILE_SERVICE } from '../../nestjs-services';
import { AnyAbility } from '@casl/ability';

@Injectable()
export class ProfileAuthorizedService {
  constructor(
    @Inject(PROFILE_SERVICE) private readonly profileService: ProfileService,
    private readonly prisma: PrismaService,
  ) {}

  async findUnique<T extends Prisma.ProfileFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileFindUniqueArgs>,
    abilities: AnyAbility,
    prisma?: Prisma.ProfileDelegate<undefined>,
  ) {
    const profile = await this.profileService.findUnique<T>(args, prisma);
    if (profile && abilities?.cannot(Action.Read, subject('Profile', profile)))
      throw new ForbiddenException('cannot read this user');
    return profile;
  }

  async findMany<T extends Prisma.ProfileFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileFindManyArgs>,
    abilities: AnyAbility,
    prisma?: Prisma.ProfileDelegate<undefined>,
  ) {
    const where = {
      AND: [
        abilities ? accessibleBy(abilities).Profile : {},
        args?.where ?? {},
      ],
    };
    return this.profileService.findMany<T>({ ...args, where }, prisma);
  }

  async create<T extends Prisma.ProfileCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileCreateArgs>,
    abilities: AnyAbility,
    prisma?: Prisma.ProfileDelegate<undefined>,
  ) {
    const create = async (client: Prisma.ProfileDelegate<undefined>) => {
      const profile = await this.profileService.create<T>(args, client);

      if (abilities?.cannot(Action.Create, subject('Profile', profile)))
        throw new ForbiddenException('cannot create Profile');

      return profile;
    };

    if (prisma) return create(prisma);
    return this.prisma.$transaction((client) => create(client.profile));
  }

  async update<T extends Prisma.ProfileUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileUpdateArgs>,
    abilities: AnyAbility,
    prisma?: Prisma.ProfileDelegate<undefined>,
  ) {
    const update = async (client: Prisma.ProfileDelegate<undefined>) => {
      const profile = await this.profileService.update<T>(args, client);

      if (abilities?.cannot(Action.Update, subject('Profile', profile)))
        throw new ForbiddenException('cannot update Profile');

      return profile;
    };

    if (prisma) return update(prisma);
    return this.prisma.$transaction((client) => update(client.profile));
  }

  async delete<T extends Prisma.ProfileDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileDeleteArgs>,
    abilities: AnyAbility,
    prisma?: Prisma.ProfileDelegate<undefined>,
  ) {
    const deleteCb = async (client: Prisma.ProfileDelegate<undefined>) => {
      const profile = await this.profileService.delete<T>(args, client);

      if (abilities?.cannot(Action.Delete, subject('Profile', profile)))
        throw new ForbiddenException('cannot delete Profile');

      return profile;
    };

    if (prisma) return deleteCb(prisma);
    return this.prisma.$transaction((client) => deleteCb(client.profile));
  }

  async count<T extends Prisma.ProfileCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileCountArgs>,
    abilities: AnyAbility,
    prisma?: Prisma.ProfileDelegate<undefined>,
  ) {
    const where = {
      AND: [
        abilities ? accessibleBy(abilities).Profile : {},
        args?.where ?? {},
      ],
    };
    return this.profileService.count<T>({ ...args, where });
  }
}
