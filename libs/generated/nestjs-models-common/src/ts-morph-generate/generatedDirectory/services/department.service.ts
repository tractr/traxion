import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class DepartmentService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *     Find zero or one Department that matches the filter.
     *     @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     *     @example
     *     // Get one Department
     *     const department = await this.departmentService.findUnique({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    findUnique<T extends Prisma.DepartmentFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.DepartmentFindUniqueArgs>, prisma: Prisma.DepartmentDelegate<any> = this.prismaClient.department) {
        return prisma.findUnique<T>(args);
    }

    /**
     *        Find the first Department that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     *        @example
     *        // Get one Department
     *        const department = await this.departmentService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.DepartmentFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.DepartmentFindFirstArgs>, prisma: Prisma.DepartmentDelegate<any> = this.prismaClient.department) {
        return prisma.findFirst<T>(args);
    }

    /**
     *        Find zero or more Departments that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {DepartmentFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all Departments
     *        const departments = await this.departmentService.findMany()
     *       
     *        // Get first 10 Departments
     *        const Departments = await this.DepartmentService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const departmentWithIdOnly = await this.DepartmentService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.DepartmentFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.DepartmentFindManyArgs>, prisma: Prisma.DepartmentDelegate<any> = this.prismaClient.department) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a Department.
     *       @param {DepartmentCreateArgs} args - Arguments to create a Department.
     *       @example
     *       // Create one Department
     *       const Department = await this.departmentService.create({
     *         data: {
     *           // ... data to create a Department
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.DepartmentCreateArgs>(args: Prisma.SelectSubset<T, Prisma.DepartmentCreateArgs>, prisma: Prisma.DepartmentDelegate<any> = this.prismaClient.department) {
        return prisma.create<T>(args);
    }

    /**
     *         Create many Departments.
     *         @param {DepartmentCreateManyArgs} args - Arguments to create many a 
     *         Departments.
     *         @example
     *         // Create many Departments
     *         const Departments = await this.departmentService.createMany({
     *           data: {
     *             *     // ... provide data here
     *           }
     *         })
     */
    createMany<T extends Prisma.DepartmentCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.DepartmentCreateManyArgs>, prisma: Prisma.DepartmentDelegate<any> = this.prismaClient.department) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a Department.
     *        @param {DepartmentUpdateArgs} args - Arguments to update a Department.
     *        @example
     *        // Update one Department
     *        const department = await this.departmentService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.DepartmentUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.DepartmentUpdateArgs>, prisma: Prisma.DepartmentDelegate<any> = this.prismaClient.department) {
        return prisma.update<T>(args);
    }

    /**
     *        Update 0 or more Departments.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {DepartmentUpdateManyArgs} args - Arguments to update one or more Departments.
     *        @example
     *        // Update many Departments
     *        const departments = await this.departmentService.updateMany({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    updateMAny<T extends Prisma.DepartmentUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.DepartmentUpdateManyArgs>, prisma: Prisma.DepartmentDelegate<any> = this.prismaClient.department) {
        return prisma.updateMany<T>(args);
    }

    /**
     *       Create or update one Department.
     *        @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     *        @example
     *        // Upsert one Department
     *        const department = await this.departmentService.upsert({
     *          create: {
     *            // ... data to create a Department
     *          },
     *          update: {
     *            // ... in case it already exists, update
     *          },
     *          where: {
     *            // ... the filter for the Department we want to update
     *          }
     *        })
     *     
     */
    upsert<T extends Prisma.DepartmentUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.DepartmentUpsertArgs>, prisma: Prisma.DepartmentDelegate<any> = this.prismaClient.department) {
        return prisma.upsert<T>(args);
    }

    /**
     *     Delete a Department.
     *     @param {DepartmentDeleteArgs} args - Arguments to delete a Department
     *     @example
     *     // Delete one Department
     *     const department = await this.departmentService.delete({
     *       where: {
     *         // ... filter to delete one Department
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.DepartmentDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.DepartmentDeleteArgs>, prisma: Prisma.DepartmentDelegate<any> = this.prismaClient.department) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more Departments.
     *     @param {DepartmentDeleteArgs} args - Arguments to filter  Departments to delete.
     *     @example
     *     // Delete a few Departments
     *     const departments = await this.departmentService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.DepartmentDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.DepartmentDeleteManyArgs>, prisma: Prisma.DepartmentDelegate<any> = this.prismaClient.department) {
        return prisma.deleteMany<T>(args);
    }

    /**
     *       Count the number of Department.
     *       Note, that providing 'undefined' is treated as the value not being there.
     *       Read more here: https://pris.ly/d/null-undefined
     *       @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     *       @example
     *       // Count one Department
     *       const Department = await this.departmentService.count({
     *         data: {
     *           // ... data to count a Department
     *         }
     *       })
     *     
     *     
     */
    count<T extends Prisma.DepartmentCountArgs>(args: Prisma.SelectSubset<T, Prisma.DepartmentCountArgs>, prisma: Prisma.DepartmentDelegate<any> = this.prismaClient.department) {
        return prisma.count<T>(args);
    }

    /**
     *         Allows you to perform aggregations operations on a Department.
     *         Note, that providing 'undefined' is treated as the value not being there.
     *         Read more here: https://pris.ly/d/null-undefined
     *         @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     *         @example
     *         // Ordered by age ascending
     *         // Where email contains prisma.io
     *         // Limited to the 10 departments
     *         const aggregations = await this.departmentService.aggregate({
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
    aggregate<T extends Prisma.DepartmentAggregateArgs>(args: Prisma.SelectSubset<T, Prisma.DepartmentAggregateArgs>, prisma: Prisma.DepartmentDelegate<any> = this.prismaClient.department) {
        return prisma.aggregate<T>(args);
    }
}
