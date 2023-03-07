import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class OpenQuestionService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *     Find zero or one OpenQuestion that matches the filter.
     *     @param {OpenQuestionFindUniqueArgs} args - Arguments to find a OpenQuestion
     *     @example
     *     // Get one OpenQuestion
     *     const openQuestion = await this.openQuestionService.findUnique({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    findUnique<T extends Prisma.OpenQuestionFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.OpenQuestionFindUniqueArgs>, prisma: Prisma.OpenQuestionDelegate<any> = this.prismaClient.openQuestion) {
        return prisma.findUnique<T>(args);
    }

    /**
     *        Find the first OpenQuestion that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {OpenQuestionFindFirstArgs} args - Arguments to find a OpenQuestion
     *        @example
     *        // Get one OpenQuestion
     *        const openQuestion = await this.openQuestionService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.OpenQuestionFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.OpenQuestionFindFirstArgs>, prisma: Prisma.OpenQuestionDelegate<any> = this.prismaClient.openQuestion) {
        return prisma.findFirst<T>(args);
    }

    /**
     *        Find zero or more OpenQuestions that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {OpenQuestionFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all OpenQuestions
     *        const openQuestions = await this.openQuestionService.findMany()
     *       
     *        // Get first 10 OpenQuestions
     *        const OpenQuestions = await this.OpenQuestionService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const openQuestionWithIdOnly = await this.OpenQuestionService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.OpenQuestionFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.OpenQuestionFindManyArgs>, prisma: Prisma.OpenQuestionDelegate<any> = this.prismaClient.openQuestion) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a OpenQuestion.
     *       @param {OpenQuestionCreateArgs} args - Arguments to create a OpenQuestion.
     *       @example
     *       // Create one OpenQuestion
     *       const OpenQuestion = await this.openQuestionService.create({
     *         data: {
     *           // ... data to create a OpenQuestion
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.OpenQuestionCreateArgs>(args: Prisma.SelectSubset<T, Prisma.OpenQuestionCreateArgs>, prisma: Prisma.OpenQuestionDelegate<any> = this.prismaClient.openQuestion) {
        return prisma.create<T>(args);
    }

    /**
     *         Create many OpenQuestions.
     *         @param {OpenQuestionCreateManyArgs} args - Arguments to create many a 
     *         OpenQuestions.
     *         @example
     *         // Create many OpenQuestions
     *         const OpenQuestions = await this.openQuestionService.createMany({
     *           data: {
     *             *     // ... provide data here
     *           }
     *         })
     */
    createMany<T extends Prisma.OpenQuestionCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.OpenQuestionCreateManyArgs>, prisma: Prisma.OpenQuestionDelegate<any> = this.prismaClient.openQuestion) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a OpenQuestion.
     *        @param {OpenQuestionUpdateArgs} args - Arguments to update a OpenQuestion.
     *        @example
     *        // Update one OpenQuestion
     *        const openQuestion = await this.openQuestionService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.OpenQuestionUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.OpenQuestionUpdateArgs>, prisma: Prisma.OpenQuestionDelegate<any> = this.prismaClient.openQuestion) {
        return prisma.update<T>(args);
    }

    /**
     *        Update 0 or more OpenQuestions.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {OpenQuestionUpdateManyArgs} args - Arguments to update one or more OpenQuestions.
     *        @example
     *        // Update many OpenQuestions
     *        const openQuestions = await this.openQuestionService.updateMany({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    updateMAny<T extends Prisma.OpenQuestionUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.OpenQuestionUpdateManyArgs>, prisma: Prisma.OpenQuestionDelegate<any> = this.prismaClient.openQuestion) {
        return prisma.updateMany<T>(args);
    }

    /**
     *       Create or update one OpenQuestion.
     *        @param {OpenQuestionUpsertArgs} args - Arguments to update or create a OpenQuestion.
     *        @example
     *        // Upsert one OpenQuestion
     *        const openQuestion = await this.openQuestionService.upsert({
     *          create: {
     *            // ... data to create a OpenQuestion
     *          },
     *          update: {
     *            // ... in case it already exists, update
     *          },
     *          where: {
     *            // ... the filter for the OpenQuestion we want to update
     *          }
     *        })
     *     
     */
    upsert<T extends Prisma.OpenQuestionUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.OpenQuestionUpsertArgs>, prisma: Prisma.OpenQuestionDelegate<any> = this.prismaClient.openQuestion) {
        return prisma.upsert<T>(args);
    }

    /**
     *     Delete a OpenQuestion.
     *     @param {OpenQuestionDeleteArgs} args - Arguments to delete a OpenQuestion
     *     @example
     *     // Delete one OpenQuestion
     *     const openQuestion = await this.openQuestionService.delete({
     *       where: {
     *         // ... filter to delete one OpenQuestion
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.OpenQuestionDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.OpenQuestionDeleteArgs>, prisma: Prisma.OpenQuestionDelegate<any> = this.prismaClient.openQuestion) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more OpenQuestions.
     *     @param {OpenQuestionDeleteArgs} args - Arguments to filter  OpenQuestions to delete.
     *     @example
     *     // Delete a few OpenQuestions
     *     const openQuestions = await this.openQuestionService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.OpenQuestionDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.OpenQuestionDeleteManyArgs>, prisma: Prisma.OpenQuestionDelegate<any> = this.prismaClient.openQuestion) {
        return prisma.deleteMany<T>(args);
    }

    /**
     *       Count the number of OpenQuestion.
     *       Note, that providing 'undefined' is treated as the value not being there.
     *       Read more here: https://pris.ly/d/null-undefined
     *       @param {OpenQuestionCountArgs} args - Arguments to filter OpenQuestions to count.
     *       @example
     *       // Count one OpenQuestion
     *       const OpenQuestion = await this.openQuestionService.count({
     *         data: {
     *           // ... data to count a OpenQuestion
     *         }
     *       })
     *     
     *     
     */
    count<T extends Prisma.OpenQuestionCountArgs>(args: Prisma.SelectSubset<T, Prisma.OpenQuestionCountArgs>, prisma: Prisma.OpenQuestionDelegate<any> = this.prismaClient.openQuestion) {
        return prisma.count<T>(args);
    }

    /**
     *         Allows you to perform aggregations operations on a OpenQuestion.
     *         Note, that providing 'undefined' is treated as the value not being there.
     *         Read more here: https://pris.ly/d/null-undefined
     *         @param {OpenQuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     *         @example
     *         // Ordered by age ascending
     *         // Where email contains prisma.io
     *         // Limited to the 10 openQuestions
     *         const aggregations = await this.openQuestionService.aggregate({
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
    aggregate<T extends Prisma.OpenQuestionAggregateArgs>(args: Prisma.SelectSubset<T, Prisma.OpenQuestionAggregateArgs>, prisma: Prisma.OpenQuestionDelegate<any> = this.prismaClient.openQuestion) {
        return prisma.aggregate<T>(args);
    }
}
