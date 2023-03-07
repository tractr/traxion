import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class AnswerService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *     Find zero or one Answer that matches the filter.
     *     @param {AnswerFindUniqueArgs} args - Arguments to find a Answer
     *     @example
     *     // Get one Answer
     *     const answer = await this.answerService.findUnique({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    findUnique<T extends Prisma.AnswerFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.AnswerFindUniqueArgs>, prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer) {
        return prisma.findUnique<T>(args);
    }

    /**
     *        Find the first Answer that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {AnswerFindFirstArgs} args - Arguments to find a Answer
     *        @example
     *        // Get one Answer
     *        const answer = await this.answerService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.AnswerFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.AnswerFindFirstArgs>, prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer) {
        return prisma.findFirst<T>(args);
    }

    /**
     *        Find zero or more Answers that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {AnswerFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all Answers
     *        const answers = await this.answerService.findMany()
     *       
     *        // Get first 10 Answers
     *        const Answers = await this.AnswerService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const answerWithIdOnly = await this.AnswerService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.AnswerFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.AnswerFindManyArgs>, prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a Answer.
     *       @param {AnswerCreateArgs} args - Arguments to create a Answer.
     *       @example
     *       // Create one Answer
     *       const Answer = await this.answerService.create({
     *         data: {
     *           // ... data to create a Answer
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.AnswerCreateArgs>(args: Prisma.SelectSubset<T, Prisma.AnswerCreateArgs>, prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer) {
        return prisma.create<T>(args);
    }

    /**
     *         Create many Answers.
     *         @param {AnswerCreateManyArgs} args - Arguments to create many a 
     *         Answers.
     *         @example
     *         // Create many Answers
     *         const Answers = await this.answerService.createMany({
     *           data: {
     *             *     // ... provide data here
     *           }
     *         })
     */
    createMany<T extends Prisma.AnswerCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.AnswerCreateManyArgs>, prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a Answer.
     *        @param {AnswerUpdateArgs} args - Arguments to update a Answer.
     *        @example
     *        // Update one Answer
     *        const answer = await this.answerService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.AnswerUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.AnswerUpdateArgs>, prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer) {
        return prisma.update<T>(args);
    }

    /**
     *        Update 0 or more Answers.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {AnswerUpdateManyArgs} args - Arguments to update one or more Answers.
     *        @example
     *        // Update many Answers
     *        const answers = await this.answerService.updateMany({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    updateMAny<T extends Prisma.AnswerUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.AnswerUpdateManyArgs>, prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer) {
        return prisma.updateMany<T>(args);
    }

    /**
     *       Create or update one Answer.
     *        @param {AnswerUpsertArgs} args - Arguments to update or create a Answer.
     *        @example
     *        // Upsert one Answer
     *        const answer = await this.answerService.upsert({
     *          create: {
     *            // ... data to create a Answer
     *          },
     *          update: {
     *            // ... in case it already exists, update
     *          },
     *          where: {
     *            // ... the filter for the Answer we want to update
     *          }
     *        })
     *     
     */
    upsert<T extends Prisma.AnswerUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.AnswerUpsertArgs>, prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer) {
        return prisma.upsert<T>(args);
    }

    /**
     *     Delete a Answer.
     *     @param {AnswerDeleteArgs} args - Arguments to delete a Answer
     *     @example
     *     // Delete one Answer
     *     const answer = await this.answerService.delete({
     *       where: {
     *         // ... filter to delete one Answer
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.AnswerDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.AnswerDeleteArgs>, prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more Answers.
     *     @param {AnswerDeleteArgs} args - Arguments to filter  Answers to delete.
     *     @example
     *     // Delete a few Answers
     *     const answers = await this.answerService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.AnswerDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.AnswerDeleteManyArgs>, prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer) {
        return prisma.deleteMany<T>(args);
    }

    /**
     *       Count the number of Answer.
     *       Note, that providing 'undefined' is treated as the value not being there.
     *       Read more here: https://pris.ly/d/null-undefined
     *       @param {AnswerCountArgs} args - Arguments to filter Answers to count.
     *       @example
     *       // Count one Answer
     *       const Answer = await this.answerService.count({
     *         data: {
     *           // ... data to count a Answer
     *         }
     *       })
     *     
     *     
     */
    count<T extends Prisma.AnswerCountArgs>(args: Prisma.SelectSubset<T, Prisma.AnswerCountArgs>, prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer) {
        return prisma.count<T>(args);
    }

    /**
     *         Allows you to perform aggregations operations on a Answer.
     *         Note, that providing 'undefined' is treated as the value not being there.
     *         Read more here: https://pris.ly/d/null-undefined
     *         @param {AnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     *         @example
     *         // Ordered by age ascending
     *         // Where email contains prisma.io
     *         // Limited to the 10 answers
     *         const aggregations = await this.answerService.aggregate({
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
    aggregate<T extends Prisma.AnswerAggregateArgs>(args: Prisma.SelectSubset<T, Prisma.AnswerAggregateArgs>, prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer) {
        return prisma.aggregate<T>(args);
    }
}
