import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class StringModelService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *     Find zero or one StringModel that matches the filter.
     *     @param {StringModelFindUniqueArgs} args - Arguments to find a StringModel
     *     @example
     *     // Get one StringModel
     *     const stringModel = await this.stringModelService.findUnique({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    findUnique<T extends Prisma.StringModelFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelFindUniqueArgs>, prisma: Prisma.StringModelDelegate<any> = this.prismaClient.stringModel) {
        return prisma.findUnique<T>(args);
    }

    /**
     *        Find the first StringModel that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {StringModelFindFirstArgs} args - Arguments to find a StringModel
     *        @example
     *        // Get one StringModel
     *        const stringModel = await this.stringModelService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.StringModelFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelFindFirstArgs>, prisma: Prisma.StringModelDelegate<any> = this.prismaClient.stringModel) {
        return prisma.findFirst<T>(args);
    }

    /**
     *        Find zero or more StringModels that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {StringModelFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all StringModels
     *        const stringModels = await this.stringModelService.findMany()
     *       
     *        // Get first 10 StringModels
     *        const StringModels = await this.StringModelService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const stringModelWithIdOnly = await this.StringModelService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.StringModelFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelFindManyArgs>, prisma: Prisma.StringModelDelegate<any> = this.prismaClient.stringModel) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a StringModel.
     *       @param {StringModelCreateArgs} args - Arguments to create a StringModel.
     *       @example
     *       // Create one StringModel
     *       const StringModel = await this.stringModelService.create({
     *         data: {
     *           // ... data to create a StringModel
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.StringModelCreateArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelCreateArgs>, prisma: Prisma.StringModelDelegate<any> = this.prismaClient.stringModel) {
        return prisma.create<T>(args);
    }

    /**
     *         Create many StringModels.
     *         @param {StringModelCreateManyArgs} args - Arguments to create many a 
     *         StringModels.
     *         @example
     *         // Create many StringModels
     *         const StringModels = await this.stringModelService.createMany({
     *           data: {
     *             *     // ... provide data here
     *           }
     *         })
     */
    createMany<T extends Prisma.StringModelCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelCreateManyArgs>, prisma: Prisma.StringModelDelegate<any> = this.prismaClient.stringModel) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a StringModel.
     *        @param {StringModelUpdateArgs} args - Arguments to update a StringModel.
     *        @example
     *        // Update one StringModel
     *        const stringModel = await this.stringModelService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.StringModelUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUpdateArgs>, prisma: Prisma.StringModelDelegate<any> = this.prismaClient.stringModel) {
        return prisma.update<T>(args);
    }

    /**
     *        Update 0 or more StringModels.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {StringModelUpdateManyArgs} args - Arguments to update one or more StringModels.
     *        @example
     *        // Update many StringModels
     *        const stringModels = await this.stringModelService.updateMany({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    updateMAny<T extends Prisma.StringModelUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUpdateManyArgs>, prisma: Prisma.StringModelDelegate<any> = this.prismaClient.stringModel) {
        return prisma.updateMany<T>(args);
    }

    /**
     *       Create or update one StringModel.
     *        @param {StringModelUpsertArgs} args - Arguments to update or create a StringModel.
     *        @example
     *        // Upsert one StringModel
     *        const stringModel = await this.stringModelService.upsert({
     *          create: {
     *            // ... data to create a StringModel
     *          },
     *          update: {
     *            // ... in case it already exists, update
     *          },
     *          where: {
     *            // ... the filter for the StringModel we want to update
     *          }
     *        })
     *     
     */
    upsert<T extends Prisma.StringModelUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelUpsertArgs>, prisma: Prisma.StringModelDelegate<any> = this.prismaClient.stringModel) {
        return prisma.upsert<T>(args);
    }

    /**
     *     Delete a StringModel.
     *     @param {StringModelDeleteArgs} args - Arguments to delete a StringModel
     *     @example
     *     // Delete one StringModel
     *     const stringModel = await this.stringModelService.delete({
     *       where: {
     *         // ... filter to delete one StringModel
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.StringModelDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelDeleteArgs>, prisma: Prisma.StringModelDelegate<any> = this.prismaClient.stringModel) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more StringModels.
     *     @param {StringModelDeleteArgs} args - Arguments to filter  StringModels to delete.
     *     @example
     *     // Delete a few StringModels
     *     const stringModels = await this.stringModelService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.StringModelDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelDeleteManyArgs>, prisma: Prisma.StringModelDelegate<any> = this.prismaClient.stringModel) {
        return prisma.deleteMany<T>(args);
    }

    /**
     *       Count the number of StringModel.
     *       Note, that providing 'undefined' is treated as the value not being there.
     *       Read more here: https://pris.ly/d/null-undefined
     *       @param {StringModelCountArgs} args - Arguments to filter StringModels to count.
     *       @example
     *       // Count one StringModel
     *       const StringModel = await this.stringModelService.count({
     *         data: {
     *           // ... data to count a StringModel
     *         }
     *       })
     *     
     *     
     */
    count<T extends Prisma.StringModelCountArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelCountArgs>, prisma: Prisma.StringModelDelegate<any> = this.prismaClient.stringModel) {
        return prisma.count<T>(args);
    }

    /**
     *         Allows you to perform aggregations operations on a StringModel.
     *         Note, that providing 'undefined' is treated as the value not being there.
     *         Read more here: https://pris.ly/d/null-undefined
     *         @param {StringModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     *         @example
     *         // Ordered by age ascending
     *         // Where email contains prisma.io
     *         // Limited to the 10 stringModels
     *         const aggregations = await this.stringModelService.aggregate({
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
    aggregate<T extends Prisma.StringModelAggregateArgs>(args: Prisma.SelectSubset<T, Prisma.StringModelAggregateArgs>, prisma: Prisma.StringModelDelegate<any> = this.prismaClient.stringModel) {
        return prisma.aggregate<T>(args);
    }
}
