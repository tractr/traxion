import { ForcedSubject, PureAbility, subject } from '@casl/ability';
import { accessibleBy, PrismaQuery } from '@casl/prisma';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PROFILE_SERVICE, ProfileService } from '../../nestjs-services';

import { Action } from '@trxn/nestjs-casl';
import { PrismaService } from '@trxn/nestjs-database';

@Injectable()
export class ProfileAuthorizedService {
  constructor(
    @Inject(PROFILE_SERVICE) private readonly profileService: ProfileService,
    private readonly prisma: PrismaService,
  ) {}

  async findUnique<
    T extends Prisma.ProfileFindUniqueArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.ProfileFindUniqueArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.ProfileDelegate<undefined>,
  ) {
    const profile = await this.profileService.findUnique<
      T,
      GlobalRejectSettings
    >(args, prisma);
    if (profile && abilities?.cannot(Action.Read, subject('Profile', profile)))
      throw new ForbiddenException('cannot read this user');
    return profile;
  }

  async findMany<
    T extends Prisma.ProfileFindManyArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.ProfileFindManyArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.ProfileDelegate<GlobalRejectSettings>,
  ) {
    const where = {
      AND: [
        abilities ? accessibleBy(abilities).Profile : {},
        args?.where ?? {},
      ],
    };
    return this.profileService.findMany<T, GlobalRejectSettings>(
      { ...args, where },
      prisma,
    );
  }

  async create<
    T extends Prisma.ProfileCreateArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.ProfileCreateArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.ProfileDelegate<GlobalRejectSettings>,
  ) {
    const create = async (client: Prisma.ProfileDelegate<undefined>) => {
      const profile = await this.profileService.create<T, GlobalRejectSettings>(
        args,
        client,
      );

      if (abilities?.cannot(Action.Create, subject('Profile', profile)))
        throw new ForbiddenException('cannot create Profile');

      return profile;
    };

    if (prisma) return create(prisma);
    return this.prisma.$transaction((client) => create(client.profile));
  }

  async update<
    T extends Prisma.ProfileUpdateArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.ProfileUpdateArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.ProfileDelegate<GlobalRejectSettings>,
  ) {
    const update = async (client: Prisma.ProfileDelegate<undefined>) => {
      const profile = await this.profileService.update<T, GlobalRejectSettings>(
        args,
        client,
      );

      if (abilities?.cannot(Action.Update, subject('Profile', profile)))
        throw new ForbiddenException('cannot update Profile');

      return profile;
    };

    if (prisma) return update(prisma);
    return this.prisma.$transaction((client) => update(client.profile));
  }

  async delete<
    T extends Prisma.ProfileDeleteArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.ProfileDeleteArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
    prisma?: Prisma.ProfileDelegate<GlobalRejectSettings>,
  ) {
    const deleteCb = async (client: Prisma.ProfileDelegate<undefined>) => {
      const profile = await this.profileService.delete<T, GlobalRejectSettings>(
        args,
        client,
      );

      if (abilities?.cannot(Action.Delete, subject('Profile', profile)))
        throw new ForbiddenException('cannot delete Profile');

      return profile;
    };

    if (prisma) return deleteCb(prisma);
    return this.prisma.$transaction((client) => deleteCb(client.profile));
  }

  async count<
    T extends Prisma.ProfileCountArgs,
    GlobalRejectSettings extends
      | Prisma.RejectOnNotFound
      | Prisma.RejectPerOperation
      | false
      | undefined,
  >(
    args: Prisma.SelectSubset<T, Prisma.ProfileCountArgs>,
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const where = {
      AND: [
        abilities ? accessibleBy(abilities).Profile : {},
        args?.where ?? {},
      ],
    };
    return this.profileService.count<T, GlobalRejectSettings>({
      ...args,
      where,
    });
  }
}
