import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class InternalFieldService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *     Find zero or one InternalField that matches the filter.
     *     @param {InternalFieldFindUniqueArgs} args - Arguments to find a InternalField
     *     @example
     *     // Get one InternalField
     *     const internalField = await this.internalFieldService.findUnique({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    findUnique<T extends Prisma.InternalFieldFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.InternalFieldFindUniqueArgs>, prisma: Prisma.InternalFieldDelegate<any> = this.prismaClient.internalField) {
        return prisma.findUnique<T>(args);
    }

    /**
     *        Find the first InternalField that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {InternalFieldFindFirstArgs} args - Arguments to find a InternalField
     *        @example
     *        // Get one InternalField
     *        const internalField = await this.internalFieldService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.InternalFieldFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.InternalFieldFindFirstArgs>, prisma: Prisma.InternalFieldDelegate<any> = this.prismaClient.internalField) {
        return prisma.findFirst<T>(args);
    }

    /**
     *        Find zero or more InternalFields that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {InternalFieldFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all InternalFields
     *        const internalFields = await this.internalFieldService.findMany()
     *       
     *        // Get first 10 InternalFields
     *        const InternalFields = await this.InternalFieldService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const internalFieldWithIdOnly = await this.InternalFieldService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.InternalFieldFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.InternalFieldFindManyArgs>, prisma: Prisma.InternalFieldDelegate<any> = this.prismaClient.internalField) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a InternalField.
     *       @param {InternalFieldCreateArgs} args - Arguments to create a InternalField.
     *       @example
     *       // Create one InternalField
     *       const InternalField = await this.internalFieldService.create({
     *         data: {
     *           // ... data to create a InternalField
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.InternalFieldCreateArgs>(args: Prisma.SelectSubset<T, Prisma.InternalFieldCreateArgs>, prisma: Prisma.InternalFieldDelegate<any> = this.prismaClient.internalField) {
        return prisma.create<T>(args);
    }

    /**
     *         Create many InternalFields.
     *         @param {InternalFieldCreateManyArgs} args - Arguments to create many a 
     *         InternalFields.
     *         @example
     *         // Create many InternalFields
     *         const InternalFields = await this.internalFieldService.createMany({
     *           data: {
     *             *     // ... provide data here
     *           }
     *         })
     */
    createMany<T extends Prisma.InternalFieldCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.InternalFieldCreateManyArgs>, prisma: Prisma.InternalFieldDelegate<any> = this.prismaClient.internalField) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a InternalField.
     *        @param {InternalFieldUpdateArgs} args - Arguments to update a InternalField.
     *        @example
     *        // Update one InternalField
     *        const internalField = await this.internalFieldService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.InternalFieldUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.InternalFieldUpdateArgs>, prisma: Prisma.InternalFieldDelegate<any> = this.prismaClient.internalField) {
        return prisma.update<T>(args);
    }

    /**
     *        Update 0 or more InternalFields.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {InternalFieldUpdateManyArgs} args - Arguments to update one or more InternalFields.
     *        @example
     *        // Update many InternalFields
     *        const internalFields = await this.internalFieldService.updateMany({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    updateMAny<T extends Prisma.InternalFieldUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.InternalFieldUpdateManyArgs>, prisma: Prisma.InternalFieldDelegate<any> = this.prismaClient.internalField) {
        return prisma.updateMany<T>(args);
    }

    /**
     *       Create or update one InternalField.
     *        @param {InternalFieldUpsertArgs} args - Arguments to update or create a InternalField.
     *        @example
     *        // Upsert one InternalField
     *        const internalField = await this.internalFieldService.upsert({
     *          create: {
     *            // ... data to create a InternalField
     *          },
     *          update: {
     *            // ... in case it already exists, update
     *          },
     *          where: {
     *            // ... the filter for the InternalField we want to update
     *          }
     *        })
     *     
     */
    upsert<T extends Prisma.InternalFieldUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.InternalFieldUpsertArgs>, prisma: Prisma.InternalFieldDelegate<any> = this.prismaClient.internalField) {
        return prisma.upsert<T>(args);
    }

    /**
     *     Delete a InternalField.
     *     @param {InternalFieldDeleteArgs} args - Arguments to delete a InternalField
     *     @example
     *     // Delete one InternalField
     *     const internalField = await this.internalFieldService.delete({
     *       where: {
     *         // ... filter to delete one InternalField
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.InternalFieldDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.InternalFieldDeleteArgs>, prisma: Prisma.InternalFieldDelegate<any> = this.prismaClient.internalField) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more InternalFields.
     *     @param {InternalFieldDeleteArgs} args - Arguments to filter  InternalFields to delete.
     *     @example
     *     // Delete a few InternalFields
     *     const internalFields = await this.internalFieldService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.InternalFieldDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.InternalFieldDeleteManyArgs>, prisma: Prisma.InternalFieldDelegate<any> = this.prismaClient.internalField) {
        return prisma.deleteMany<T>(args);
    }

    /**
     *       Count the number of InternalField.
     *       Note, that providing 'undefined' is treated as the value not being there.
     *       Read more here: https://pris.ly/d/null-undefined
     *       @param {InternalFieldCountArgs} args - Arguments to filter InternalFields to count.
     *       @example
     *       // Count one InternalField
     *       const InternalField = await this.internalFieldService.count({
     *         data: {
     *           // ... data to count a InternalField
     *         }
     *       })
     *     
     *     
     */
    count<T extends Prisma.InternalFieldCountArgs>(args: Prisma.SelectSubset<T, Prisma.InternalFieldCountArgs>, prisma: Prisma.InternalFieldDelegate<any> = this.prismaClient.internalField) {
        return prisma.count<T>(args);
    }

    /**
     *         Allows you to perform aggregations operations on a InternalField.
     *         Note, that providing 'undefined' is treated as the value not being there.
     *         Read more here: https://pris.ly/d/null-undefined
     *         @param {InternalFieldAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     *         @example
     *         // Ordered by age ascending
     *         // Where email contains prisma.io
     *         // Limited to the 10 internalFields
     *         const aggregations = await this.internalFieldService.aggregate({
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
    aggregate<T extends Prisma.InternalFieldAggregateArgs>(args: Prisma.SelectSubset<T, Prisma.InternalFieldAggregateArgs>, prisma: Prisma.InternalFieldDelegate<any> = this.prismaClient.internalField) {
        return prisma.aggregate<T>(args);
    }
}
