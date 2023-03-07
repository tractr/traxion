import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class StringModelUniqueService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *     Find zero or one StringModelUnique that matches the filter.
     *     @param {StringModelUniqueFindUniqueArgs} args - Arguments to find a StringModelUnique
     *     @example
     *     // Get one StringModelUnique
     *     const stringModelUnique = await this.stringModelUniqueService.findUnique({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    findUnique<T extends Prisma.StringModelUniqueFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUniqueFindUniqueArgs>, prisma: Prisma.StringModelUniqueDelegate<any> = this.prismaClient.stringModelUnique) {
        return prisma.findUnique<T>(args);
    }

    /**
     *        Find the first StringModelUnique that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {StringModelUniqueFindFirstArgs} args - Arguments to find a StringModelUnique
     *        @example
     *        // Get one StringModelUnique
     *        const stringModelUnique = await this.stringModelUniqueService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.StringModelUniqueFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUniqueFindFirstArgs>, prisma: Prisma.StringModelUniqueDelegate<any> = this.prismaClient.stringModelUnique) {
        return prisma.findFirst<T>(args);
    }

    /**
     *        Find zero or more StringModelUniques that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {StringModelUniqueFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all StringModelUniques
     *        const stringModelUniques = await this.stringModelUniqueService.findMany()
     *       
     *        // Get first 10 StringModelUniques
     *        const StringModelUniques = await this.StringModelUniqueService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const stringModelUniqueWithIdOnly = await this.StringModelUniqueService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.StringModelUniqueFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUniqueFindManyArgs>, prisma: Prisma.StringModelUniqueDelegate<any> = this.prismaClient.stringModelUnique) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a StringModelUnique.
     *       @param {StringModelUniqueCreateArgs} args - Arguments to create a StringModelUnique.
     *       @example
     *       // Create one StringModelUnique
     *       const StringModelUnique = await this.stringModelUniqueService.create({
     *         data: {
     *           // ... data to create a StringModelUnique
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.StringModelUniqueCreateArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUniqueCreateArgs>, prisma: Prisma.StringModelUniqueDelegate<any> = this.prismaClient.stringModelUnique) {
        return prisma.create<T>(args);
    }

    /**
     *         Create many StringModelUniques.
     *         @param {StringModelUniqueCreateManyArgs} args - Arguments to create many a 
     *         StringModelUniques.
     *         @example
     *         // Create many StringModelUniques
     *         const StringModelUniques = await this.stringModelUniqueService.createMany({
     *           data: {
     *             *     // ... provide data here
     *           }
     *         })
     */
    createMany<T extends Prisma.StringModelUniqueCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUniqueCreateManyArgs>, prisma: Prisma.StringModelUniqueDelegate<any> = this.prismaClient.stringModelUnique) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a StringModelUnique.
     *        @param {StringModelUniqueUpdateArgs} args - Arguments to update a StringModelUnique.
     *        @example
     *        // Update one StringModelUnique
     *        const stringModelUnique = await this.stringModelUniqueService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.StringModelUniqueUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUniqueUpdateArgs>, prisma: Prisma.StringModelUniqueDelegate<any> = this.prismaClient.stringModelUnique) {
        return prisma.update<T>(args);
    }

    /**
     *        Update 0 or more StringModelUniques.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {StringModelUniqueUpdateManyArgs} args - Arguments to update one or more StringModelUniques.
     *        @example
     *        // Update many StringModelUniques
     *        const stringModelUniques = await this.stringModelUniqueService.updateMany({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    updateMAny<T extends Prisma.StringModelUniqueUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUniqueUpdateManyArgs>, prisma: Prisma.StringModelUniqueDelegate<any> = this.prismaClient.stringModelUnique) {
        return prisma.updateMany<T>(args);
    }

    /**
     *       Create or update one StringModelUnique.
     *        @param {StringModelUniqueUpsertArgs} args - Arguments to update or create a StringModelUnique.
     *        @example
     *        // Upsert one StringModelUnique
     *        const stringModelUnique = await this.stringModelUniqueService.upsert({
     *          create: {
     *            // ... data to create a StringModelUnique
     *          },
     *          update: {
     *            // ... in case it already exists, update
     *          },
     *          where: {
     *            // ... the filter for the StringModelUnique we want to update
     *          }
     *        })
     *     
     */
    upsert<T extends Prisma.StringModelUniqueUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUniqueUpsertArgs>, prisma: Prisma.StringModelUniqueDelegate<any> = this.prismaClient.stringModelUnique) {
        return prisma.upsert<T>(args);
    }

    /**
     *     Delete a StringModelUnique.
     *     @param {StringModelUniqueDeleteArgs} args - Arguments to delete a StringModelUnique
     *     @example
     *     // Delete one StringModelUnique
     *     const stringModelUnique = await this.stringModelUniqueService.delete({
     *       where: {
     *         // ... filter to delete one StringModelUnique
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.StringModelUniqueDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUniqueDeleteArgs>, prisma: Prisma.StringModelUniqueDelegate<any> = this.prismaClient.stringModelUnique) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more StringModelUniques.
     *     @param {StringModelUniqueDeleteArgs} args - Arguments to filter  StringModelUniques to delete.
     *     @example
     *     // Delete a few StringModelUniques
     *     const stringModelUniques = await this.stringModelUniqueService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.StringModelUniqueDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUniqueDeleteManyArgs>, prisma: Prisma.StringModelUniqueDelegate<any> = this.prismaClient.stringModelUnique) {
        return prisma.deleteMany<T>(args);
    }

    /**
     *       Count the number of StringModelUnique.
     *       Note, that providing 'undefined' is treated as the value not being there.
     *       Read more here: https://pris.ly/d/null-undefined
     *       @param {StringModelUniqueCountArgs} args - Arguments to filter StringModelUniques to count.
     *       @example
     *       // Count one StringModelUnique
     *       const StringModelUnique = await this.stringModelUniqueService.count({
     *         data: {
     *           // ... data to count a StringModelUnique
     *         }
     *       })
     *     
     *     
     */
    count<T extends Prisma.StringModelUniqueCountArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUniqueCountArgs>, prisma: Prisma.StringModelUniqueDelegate<any> = this.prismaClient.stringModelUnique) {
        return prisma.count<T>(args);
    }

    /**
     *         Allows you to perform aggregations operations on a StringModelUnique.
     *         Note, that providing 'undefined' is treated as the value not being there.
     *         Read more here: https://pris.ly/d/null-undefined
     *         @param {StringModelUniqueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     *         @example
     *         // Ordered by age ascending
     *         // Where email contains prisma.io
     *         // Limited to the 10 stringModelUniques
     *         const aggregations = await this.stringModelUniqueService.aggregate({
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
    aggregate<T extends Prisma.StringModelUniqueAggregateArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUniqueAggregateArgs>, prisma: Prisma.StringModelUniqueDelegate<any> = this.prismaClient.stringModelUnique) {
        return prisma.aggregate<T>(args);
    }
}
