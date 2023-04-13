import { Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "@trxn/nestjs-database";

@Injectable()
export class RoleService {
    constructor(private readonly prismaClient: PrismaService) {
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
    findUnique<T extends Prisma.RoleFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.RoleFindUniqueArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.role) {
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
    findFirst<T extends Prisma.RoleFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.RoleFindFirstArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.role) {
        return prisma.findFirst<T>(args);
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
    findMany<T extends Prisma.RoleFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.RoleFindManyArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.role) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a Role.
     *       @param {RoleCreateArgs} args - Arguments to create a Role.
     *       @example
     *       // Create one Role
     *       const Role = await this.roleService.create({
     *         data: {
     *           // ... data to create a Role
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.RoleCreateArgs>(args: Prisma.SelectSubset<T, Prisma.RoleCreateArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.role) {
        return prisma.create<T>(args);
    }

    /**
     *         Create many Roles.
     *         @param {RoleCreateManyArgs} args - Arguments to create many a 
     *         Roles.
     *         @example
     *         // Create many Roles
     *         const Roles = await this.roleService.createMany({
     *           data: {
     *             *     // ... provide data here
     *           }
     *         })
     */
    createMany<T extends Prisma.RoleCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.RoleCreateManyArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.role) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a Role.
     *        @param {RoleUpdateArgs} args - Arguments to update a Role.
     *        @example
     *        // Update one Role
     *        const role = await this.roleService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.RoleUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.RoleUpdateArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.role) {
        return prisma.update<T>(args);
    }

    /**
     *        Update 0 or more Roles.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {RoleUpdateManyArgs} args - Arguments to update one or more Roles.
     *        @example
     *        // Update many Roles
     *        const roles = await this.roleService.updateMany({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    updateMAny<T extends Prisma.RoleUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.RoleUpdateManyArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.role) {
        return prisma.updateMany<T>(args);
    }

    /**
     *       Create or update one Role.
     *        @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     *        @example
     *        // Upsert one Role
     *        const role = await this.roleService.upsert({
     *          create: {
     *            // ... data to create a Role
     *          },
     *          update: {
     *            // ... in case it already exists, update
     *          },
     *          where: {
     *            // ... the filter for the Role we want to update
     *          }
     *        })
     *     
     */
    upsert<T extends Prisma.RoleUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.RoleUpsertArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.role) {
        return prisma.upsert<T>(args);
    }

    /**
     *     Delete a Role.
     *     @param {RoleDeleteArgs} args - Arguments to delete a Role
     *     @example
     *     // Delete one Role
     *     const role = await this.roleService.delete({
     *       where: {
     *         // ... filter to delete one Role
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.RoleDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.RoleDeleteArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.role) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more Roles.
     *     @param {RoleDeleteArgs} args - Arguments to filter  Roles to delete.
     *     @example
     *     // Delete a few Roles
     *     const roles = await this.roleService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.RoleDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.RoleDeleteManyArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.role) {
        return prisma.deleteMany<T>(args);
    }

    /**
     *       Count the number of Role.
     *       Note, that providing 'undefined' is treated as the value not being there.
     *       Read more here: https://pris.ly/d/null-undefined
     *       @param {RoleCountArgs} args - Arguments to filter Roles to count.
     *       @example
     *       // Count one Role
     *       const Role = await this.roleService.count({
     *         data: {
     *           // ... data to count a Role
     *         }
     *       })
     *     
     *     
     */
    count<T extends Prisma.RoleCountArgs>(args: Prisma.SelectSubset<T, Prisma.RoleCountArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.role) {
        return prisma.count<T>(args);
    }

    /**
     *         Allows you to perform aggregations operations on a Role.
     *         Note, that providing 'undefined' is treated as the value not being there.
     *         Read more here: https://pris.ly/d/null-undefined
     *         @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     *         @example
     *         // Ordered by age ascending
     *         // Where email contains prisma.io
     *         // Limited to the 10 roles
     *         const aggregations = await this.roleService.aggregate({
     *           avg: {
     *             age: true,
     *           },
     *           where: {
     *             email: {
     *               contains: "prisma.io",
     *             },
     *           },
     *           orderBy: {
     *             age: "asc",
     *           },
     *           take: 10,
     *         })
     *     
     */
    aggregate<T extends Prisma.RoleAggregateArgs>(args: Prisma.SelectSubset<T, Prisma.RoleAggregateArgs>, prisma: Prisma.RoleDelegate<any> = this.prismaClient.role) {
        return prisma.aggregate<T>(args);
    }
}
