import { Injectable, Inject } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RoleService, ROLE_SERVICE } from '../../nestjs-services';
import { AppAbility } from '../../casl-target';

@Injectable()
export class RoleAuthorizedService {
  constructor(
    @Inject(ROLE_SERVICE) private readonly roleService: RoleService,
  ) {}

  async findUnique<T extends Prisma.RoleFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleFindUniqueArgs>,
    abilities: AppAbility,
  ) {
    return this.roleService.findUnique<T>(args);
  }

  async findMany<T extends Prisma.RoleFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleFindManyArgs>,
    abilities: AppAbility,
  ) {
    return this.roleService.findMany<T>(args);
  }

  async create<T extends Prisma.RoleCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleCreateArgs>,
    abilities: AppAbility,
  ) {
    return this.roleService.create<T>(args);
  }

  async update<T extends Prisma.RoleUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleUpdateArgs>,
    abilities: AppAbility,
  ) {
    return this.roleService.findUnique<T>(args);
  }

  async delete<T extends Prisma.RoleDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleDeleteArgs>,
    abilities: AppAbility,
  ) {
    return this.roleService.delete<T>(args);
  }

  async count<T extends Prisma.RoleCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleCountArgs>,
    abilities: AppAbility,
  ) {
    return this.roleService.count<T>(args);
  }
}
