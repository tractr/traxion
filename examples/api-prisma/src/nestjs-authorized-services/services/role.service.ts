import { Injectable, Inject } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RoleService, ROLE_SERVICE } from 'test';

@Injectable()
export class RoleAuthorizedService {
  constructor(
    @Inject(ROLE_SERVICE) private readonly roleService: RoleService,
  ) {}

  /**
   *     Find zero or one Role that matches the filter.
   *     @param {RoleFindUniqueArgs} args - Arguments to find a Role
   *     @example
   *     // Get one Role
   *     const role = await this.roleService.findUnique({
   *       where: {
   *         // ... provide filter here
   *       }
   *     })
   *
   */
  async findUnique<T extends Prisma.RoleFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleFindUniqueArgs>,
  ) {
    return this.roleService.findUnique<T>(args);
  }
}
