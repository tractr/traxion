import { Injectable, Inject } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RightService, RIGHT_SERVICE } from '../../nestjs-services';
import { AppAbility } from '../../casl-target';

@Injectable()
export class RightAuthorizedService {
  constructor(
    @Inject(RIGHT_SERVICE) private readonly rightService: RightService,
  ) {}

  async findUnique<T extends Prisma.RightFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightFindUniqueArgs>,
    abilities: AppAbility,
  ) {
    return this.rightService.findUnique<T>(args);
  }

  async findMany<T extends Prisma.RightFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightFindManyArgs>,
    abilities: AppAbility,
  ) {
    return this.rightService.findMany<T>(args);
  }

  async create<T extends Prisma.RightCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightCreateArgs>,
    abilities: AppAbility,
  ) {
    return this.rightService.create<T>(args);
  }

  async update<T extends Prisma.RightUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightUpdateArgs>,
    abilities: AppAbility,
  ) {
    return this.rightService.findUnique<T>(args);
  }

  async delete<T extends Prisma.RightDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightDeleteArgs>,
    abilities: AppAbility,
  ) {
    return this.rightService.delete<T>(args);
  }

  async count<T extends Prisma.RightCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightCountArgs>,
    abilities: AppAbility,
  ) {
    return this.rightService.count<T>(args);
  }
}
