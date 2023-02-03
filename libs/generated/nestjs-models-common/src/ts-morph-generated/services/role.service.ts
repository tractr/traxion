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

    /**
     *        Find the first Role that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {RoleFindFirstArgs} args - Arguments to find a Role
     *        @example
     *        // Get one Role
     *        const role = await this.roleService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.RoleFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.RoleFindFirstArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.Role) {
        return prisma.FindFirst<T>(args);
    }

    /**
     *        Find zero or more Roles that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {RoleFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all Roles
     *        const roles = await this.roleService.findMany()
     *       
     *        // Get first 10 Roles
     *        const Roles = await this.RoleService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const roleWithIdOnly = await this.RoleService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.RoleFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.RoleFindManyArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.Role) {
        return prisma.FindMany<T>(args);
    }
}
