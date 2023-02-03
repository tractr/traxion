import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable
export class RoleService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

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
    findUnique<T extends Prisma.RoleFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.RoleFindUniqueArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.Role) {
        return prisma.findUnique<T>(args);
    }
}
