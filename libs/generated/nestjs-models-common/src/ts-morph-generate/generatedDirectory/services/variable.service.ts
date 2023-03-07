import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class VariableService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *     Find zero or one Variable that matches the filter.
     *     @param {VariableFindUniqueArgs} args - Arguments to find a Variable
     *     @example
     *     // Get one Variable
     *     const variable = await this.variableService.findUnique({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    findUnique<T extends Prisma.VariableFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.VariableFindUniqueArgs>, prisma: Prisma.VariableDelegate<any> = this.prismaClient.variable) {
        return prisma.findUnique<T>(args);
    }

    /**
     *        Find the first Variable that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {VariableFindFirstArgs} args - Arguments to find a Variable
     *        @example
     *        // Get one Variable
     *        const variable = await this.variableService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.VariableFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.VariableFindFirstArgs>, prisma: Prisma.VariableDelegate<any> = this.prismaClient.variable) {
        return prisma.findFirst<T>(args);
    }

    /**
     *        Find zero or more Variables that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {VariableFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all Variables
     *        const variables = await this.variableService.findMany()
     *       
     *        // Get first 10 Variables
     *        const Variables = await this.VariableService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const variableWithIdOnly = await this.VariableService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.VariableFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.VariableFindManyArgs>, prisma: Prisma.VariableDelegate<any> = this.prismaClient.variable) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a Variable.
     *       @param {VariableCreateArgs} args - Arguments to create a Variable.
     *       @example
     *       // Create one Variable
     *       const Variable = await this.variableService.create({
     *         data: {
     *           // ... data to create a Variable
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.VariableCreateArgs>(args: Prisma.SelectSubset<T, Prisma.VariableCreateArgs>, prisma: Prisma.VariableDelegate<any> = this.prismaClient.variable) {
        return prisma.create<T>(args);
    }

    /**
     *         Create many Variables.
     *         @param {VariableCreateManyArgs} args - Arguments to create many a 
     *         Variables.
     *         @example
     *         // Create many Variables
     *         const Variables = await this.variableService.createMany({
     *           data: {
     *             *     // ... provide data here
     *           }
     *         })
     */
    createMany<T extends Prisma.VariableCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.VariableCreateManyArgs>, prisma: Prisma.VariableDelegate<any> = this.prismaClient.variable) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a Variable.
     *        @param {VariableUpdateArgs} args - Arguments to update a Variable.
     *        @example
     *        // Update one Variable
     *        const variable = await this.variableService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.VariableUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.VariableUpdateArgs>, prisma: Prisma.VariableDelegate<any> = this.prismaClient.variable) {
        return prisma.update<T>(args);
    }

    /**
     *        Update 0 or more Variables.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {VariableUpdateManyArgs} args - Arguments to update one or more Variables.
     *        @example
     *        // Update many Variables
     *        const variables = await this.variableService.updateMany({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    updateMAny<T extends Prisma.VariableUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.VariableUpdateManyArgs>, prisma: Prisma.VariableDelegate<any> = this.prismaClient.variable) {
        return prisma.updateMany<T>(args);
    }

    /**
     *       Create or update one Variable.
     *        @param {VariableUpsertArgs} args - Arguments to update or create a Variable.
     *        @example
     *        // Upsert one Variable
     *        const variable = await this.variableService.upsert({
     *          create: {
     *            // ... data to create a Variable
     *          },
     *          update: {
     *            // ... in case it already exists, update
     *          },
     *          where: {
     *            // ... the filter for the Variable we want to update
     *          }
     *        })
     *     
     */
    upsert<T extends Prisma.VariableUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.VariableUpsertArgs>, prisma: Prisma.VariableDelegate<any> = this.prismaClient.variable) {
        return prisma.upsert<T>(args);
    }

    /**
     *     Delete a Variable.
     *     @param {VariableDeleteArgs} args - Arguments to delete a Variable
     *     @example
     *     // Delete one Variable
     *     const variable = await this.variableService.delete({
     *       where: {
     *         // ... filter to delete one Variable
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.VariableDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.VariableDeleteArgs>, prisma: Prisma.VariableDelegate<any> = this.prismaClient.variable) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more Variables.
     *     @param {VariableDeleteArgs} args - Arguments to filter  Variables to delete.
     *     @example
     *     // Delete a few Variables
     *     const variables = await this.variableService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.VariableDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.VariableDeleteManyArgs>, prisma: Prisma.VariableDelegate<any> = this.prismaClient.variable) {
        return prisma.deleteMany<T>(args);
    }

    /**
     *       Count the number of Variable.
     *       Note, that providing 'undefined' is treated as the value not being there.
     *       Read more here: https://pris.ly/d/null-undefined
     *       @param {VariableCountArgs} args - Arguments to filter Variables to count.
     *       @example
     *       // Count one Variable
     *       const Variable = await this.variableService.count({
     *         data: {
     *           // ... data to count a Variable
     *         }
     *       })
     *     
     *     
     */
    count<T extends Prisma.VariableCountArgs>(args: Prisma.SelectSubset<T, Prisma.VariableCountArgs>, prisma: Prisma.VariableDelegate<any> = this.prismaClient.variable) {
        return prisma.count<T>(args);
    }

    /**
     *         Allows you to perform aggregations operations on a Variable.
     *         Note, that providing 'undefined' is treated as the value not being there.
     *         Read more here: https://pris.ly/d/null-undefined
     *         @param {VariableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     *         @example
     *         // Ordered by age ascending
     *         // Where email contains prisma.io
     *         // Limited to the 10 variables
     *         const aggregations = await this.variableService.aggregate({
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
    aggregate<T extends Prisma.VariableAggregateArgs>(args: Prisma.SelectSubset<T, Prisma.VariableAggregateArgs>, prisma: Prisma.VariableDelegate<any> = this.prismaClient.variable) {
        return prisma.aggregate<T>(args);
    }
}
