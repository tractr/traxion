import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class TagService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *     Find zero or one Tag that matches the filter.
     *     @param {TagFindUniqueArgs} args - Arguments to find a Tag
     *     @example
     *     // Get one Tag
     *     const tag = await this.tagService.findUnique({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    findUnique<T extends Prisma.TagFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.TagFindUniqueArgs>, prisma: Prisma.TagDelegate<any> = this.prismaClient.tag) {
        return prisma.findUnique<T>(args);
    }

    /**
     *        Find the first Tag that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {TagFindFirstArgs} args - Arguments to find a Tag
     *        @example
     *        // Get one Tag
     *        const tag = await this.tagService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.TagFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.TagFindFirstArgs>, prisma: Prisma.TagDelegate<any> = this.prismaClient.tag) {
        return prisma.findFirst<T>(args);
    }

    /**
     *        Find zero or more Tags that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {TagFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all Tags
     *        const tags = await this.tagService.findMany()
     *       
     *        // Get first 10 Tags
     *        const Tags = await this.TagService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const tagWithIdOnly = await this.TagService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.TagFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.TagFindManyArgs>, prisma: Prisma.TagDelegate<any> = this.prismaClient.tag) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a Tag.
     *       @param {TagCreateArgs} args - Arguments to create a Tag.
     *       @example
     *       // Create one Tag
     *       const Tag = await this.tagService.create({
     *         data: {
     *           // ... data to create a Tag
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.TagCreateArgs>(args: Prisma.SelectSubset<T, Prisma.TagCreateArgs>, prisma: Prisma.TagDelegate<any> = this.prismaClient.tag) {
        return prisma.create<T>(args);
    }

    /**
     *         Create many Tags.
     *         @param {TagCreateManyArgs} args - Arguments to create many a 
     *         Tags.
     *         @example
     *         // Create many Tags
     *         const Tags = await this.tagService.createMany({
     *           data: {
     *             *     // ... provide data here
     *           }
     *         })
     */
    createMany<T extends Prisma.TagCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.TagCreateManyArgs>, prisma: Prisma.TagDelegate<any> = this.prismaClient.tag) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a Tag.
     *        @param {TagUpdateArgs} args - Arguments to update a Tag.
     *        @example
     *        // Update one Tag
     *        const tag = await this.tagService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.TagUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.TagUpdateArgs>, prisma: Prisma.TagDelegate<any> = this.prismaClient.tag) {
        return prisma.update<T>(args);
    }

    /**
     *        Update 0 or more Tags.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {TagUpdateManyArgs} args - Arguments to update one or more Tags.
     *        @example
     *        // Update many Tags
     *        const tags = await this.tagService.updateMany({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    updateMAny<T extends Prisma.TagUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.TagUpdateManyArgs>, prisma: Prisma.TagDelegate<any> = this.prismaClient.tag) {
        return prisma.updateMany<T>(args);
    }

    /**
     *       Create or update one Tag.
     *        @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     *        @example
     *        // Upsert one Tag
     *        const tag = await this.tagService.upsert({
     *          create: {
     *            // ... data to create a Tag
     *          },
     *          update: {
     *            // ... in case it already exists, update
     *          },
     *          where: {
     *            // ... the filter for the Tag we want to update
     *          }
     *        })
     *     
     */
    upsert<T extends Prisma.TagUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.TagUpsertArgs>, prisma: Prisma.TagDelegate<any> = this.prismaClient.tag) {
        return prisma.upsert<T>(args);
    }

    /**
     *     Delete a Tag.
     *     @param {TagDeleteArgs} args - Arguments to delete a Tag
     *     @example
     *     // Delete one Tag
     *     const tag = await this.tagService.delete({
     *       where: {
     *         // ... filter to delete one Tag
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.TagDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.TagDeleteArgs>, prisma: Prisma.TagDelegate<any> = this.prismaClient.tag) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more Tags.
     *     @param {TagDeleteArgs} args - Arguments to filter  Tags to delete.
     *     @example
     *     // Delete a few Tags
     *     const tags = await this.tagService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.TagDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.TagDeleteManyArgs>, prisma: Prisma.TagDelegate<any> = this.prismaClient.tag) {
        return prisma.deleteMany<T>(args);
    }

    /**
     *       Count the number of Tag.
     *       Note, that providing 'undefined' is treated as the value not being there.
     *       Read more here: https://pris.ly/d/null-undefined
     *       @param {TagCountArgs} args - Arguments to filter Tags to count.
     *       @example
     *       // Count one Tag
     *       const Tag = await this.tagService.count({
     *         data: {
     *           // ... data to count a Tag
     *         }
     *       })
     *     
     *     
     */
    count<T extends Prisma.TagCountArgs>(args: Prisma.SelectSubset<T, Prisma.TagCountArgs>, prisma: Prisma.TagDelegate<any> = this.prismaClient.tag) {
        return prisma.count<T>(args);
    }

    /**
     *         Allows you to perform aggregations operations on a Tag.
     *         Note, that providing 'undefined' is treated as the value not being there.
     *         Read more here: https://pris.ly/d/null-undefined
     *         @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     *         @example
     *         // Ordered by age ascending
     *         // Where email contains prisma.io
     *         // Limited to the 10 tags
     *         const aggregations = await this.tagService.aggregate({
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
    aggregate<T extends Prisma.TagAggregateArgs>(args: Prisma.SelectSubset<T, Prisma.TagAggregateArgs>, prisma: Prisma.TagDelegate<any> = this.prismaClient.tag) {
        return prisma.aggregate<T>(args);
    }
}
