import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class UniqueValueFieldService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *     Find zero or one UniqueValueField that matches the filter.
     *     @param {UniqueValueFieldFindUniqueArgs} args - Arguments to find a UniqueValueField
     *     @example
     *     // Get one UniqueValueField
     *     const uniqueValueField = await this.uniqueValueFieldService.findUnique({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    findUnique<T extends Prisma.UniqueValueFieldFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.UniqueValueFieldFindUniqueArgs>, prisma: Prisma.UniqueValueFieldDelegate<any> = this.prismaClient.uniqueValueField) {
        return prisma.findUnique<T>(args);
    }

    /**
     *        Find the first UniqueValueField that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {UniqueValueFieldFindFirstArgs} args - Arguments to find a UniqueValueField
     *        @example
     *        // Get one UniqueValueField
     *        const uniqueValueField = await this.uniqueValueFieldService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.UniqueValueFieldFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.UniqueValueFieldFindFirstArgs>, prisma: Prisma.UniqueValueFieldDelegate<any> = this.prismaClient.uniqueValueField) {
        return prisma.findFirst<T>(args);
    }

    /**
     *        Find zero or more UniqueValueFields that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {UniqueValueFieldFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all UniqueValueFields
     *        const uniqueValueFields = await this.uniqueValueFieldService.findMany()
     *       
     *        // Get first 10 UniqueValueFields
     *        const UniqueValueFields = await this.UniqueValueFieldService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const uniqueValueFieldWithIdOnly = await this.UniqueValueFieldService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.UniqueValueFieldFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.UniqueValueFieldFindManyArgs>, prisma: Prisma.UniqueValueFieldDelegate<any> = this.prismaClient.uniqueValueField) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a UniqueValueField.
     *       @param {UniqueValueFieldCreateArgs} args - Arguments to create a UniqueValueField.
     *       @example
     *       // Create one UniqueValueField
     *       const UniqueValueField = await this.uniqueValueFieldService.create({
     *         data: {
     *           // ... data to create a UniqueValueField
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.UniqueValueFieldCreateArgs>(args: Prisma.SelectSubset<T, Prisma.UniqueValueFieldCreateArgs>, prisma: Prisma.UniqueValueFieldDelegate<any> = this.prismaClient.uniqueValueField) {
        return prisma.create<T>(args);
    }

    /**
     *         Create many UniqueValueFields.
     *         @param {UniqueValueFieldCreateManyArgs} args - Arguments to create many a 
     *         UniqueValueFields.
     *         @example
     *         // Create many UniqueValueFields
     *         const UniqueValueFields = await this.uniqueValueFieldService.createMany({
     *           data: {
     *             *     // ... provide data here
     *           }
     *         })
     */
    createMany<T extends Prisma.UniqueValueFieldCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.UniqueValueFieldCreateManyArgs>, prisma: Prisma.UniqueValueFieldDelegate<any> = this.prismaClient.uniqueValueField) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a UniqueValueField.
     *        @param {UniqueValueFieldUpdateArgs} args - Arguments to update a UniqueValueField.
     *        @example
     *        // Update one UniqueValueField
     *        const uniqueValueField = await this.uniqueValueFieldService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.UniqueValueFieldUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.UniqueValueFieldUpdateArgs>, prisma: Prisma.UniqueValueFieldDelegate<any> = this.prismaClient.uniqueValueField) {
        return prisma.update<T>(args);
    }

    /**
     *        Update 0 or more UniqueValueFields.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {UniqueValueFieldUpdateManyArgs} args - Arguments to update one or more UniqueValueFields.
     *        @example
     *        // Update many UniqueValueFields
     *        const uniqueValueFields = await this.uniqueValueFieldService.updateMany({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    updateMAny<T extends Prisma.UniqueValueFieldUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.UniqueValueFieldUpdateManyArgs>, prisma: Prisma.UniqueValueFieldDelegate<any> = this.prismaClient.uniqueValueField) {
        return prisma.updateMany<T>(args);
    }

    /**
     *       Create or update one UniqueValueField.
     *        @param {UniqueValueFieldUpsertArgs} args - Arguments to update or create a UniqueValueField.
     *        @example
     *        // Upsert one UniqueValueField
     *        const uniqueValueField = await this.uniqueValueFieldService.upsert({
     *          create: {
     *            // ... data to create a UniqueValueField
     *          },
     *          update: {
     *            // ... in case it already exists, update
     *          },
     *          where: {
     *            // ... the filter for the UniqueValueField we want to update
     *          }
     *        })
     *     
     */
    upsert<T extends Prisma.UniqueValueFieldUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.UniqueValueFieldUpsertArgs>, prisma: Prisma.UniqueValueFieldDelegate<any> = this.prismaClient.uniqueValueField) {
        return prisma.upsert<T>(args);
    }

    /**
     *     Delete a UniqueValueField.
     *     @param {UniqueValueFieldDeleteArgs} args - Arguments to delete a UniqueValueField
     *     @example
     *     // Delete one UniqueValueField
     *     const uniqueValueField = await this.uniqueValueFieldService.delete({
     *       where: {
     *         // ... filter to delete one UniqueValueField
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.UniqueValueFieldDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.UniqueValueFieldDeleteArgs>, prisma: Prisma.UniqueValueFieldDelegate<any> = this.prismaClient.uniqueValueField) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more UniqueValueFields.
     *     @param {UniqueValueFieldDeleteArgs} args - Arguments to filter  UniqueValueFields to delete.
     *     @example
     *     // Delete a few UniqueValueFields
     *     const uniqueValueFields = await this.uniqueValueFieldService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.UniqueValueFieldDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.UniqueValueFieldDeleteManyArgs>, prisma: Prisma.UniqueValueFieldDelegate<any> = this.prismaClient.uniqueValueField) {
        return prisma.deleteMany<T>(args);
    }

    /**
     *       Count the number of UniqueValueField.
     *       Note, that providing 'undefined' is treated as the value not being there.
     *       Read more here: https://pris.ly/d/null-undefined
     *       @param {UniqueValueFieldCountArgs} args - Arguments to filter UniqueValueFields to count.
     *       @example
     *       // Count one UniqueValueField
     *       const UniqueValueField = await this.uniqueValueFieldService.count({
     *         data: {
     *           // ... data to count a UniqueValueField
     *         }
     *       })
     *     
     *     
     */
    count<T extends Prisma.UniqueValueFieldCountArgs>(args: Prisma.SelectSubset<T, Prisma.UniqueValueFieldCountArgs>, prisma: Prisma.UniqueValueFieldDelegate<any> = this.prismaClient.uniqueValueField) {
        return prisma.count<T>(args);
    }

    /**
     *         Allows you to perform aggregations operations on a UniqueValueField.
     *         Note, that providing 'undefined' is treated as the value not being there.
     *         Read more here: https://pris.ly/d/null-undefined
     *         @param {UniqueValueFieldAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     *         @example
     *         // Ordered by age ascending
     *         // Where email contains prisma.io
     *         // Limited to the 10 uniqueValueFields
     *         const aggregations = await this.uniqueValueFieldService.aggregate({
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
    aggregate<T extends Prisma.UniqueValueFieldAggregateArgs>(args: Prisma.SelectSubset<T, Prisma.UniqueValueFieldAggregateArgs>, prisma: Prisma.UniqueValueFieldDelegate<any> = this.prismaClient.uniqueValueField) {
        return prisma.aggregate<T>(args);
    }
}
