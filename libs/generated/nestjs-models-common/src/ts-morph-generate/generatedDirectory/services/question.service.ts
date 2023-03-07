import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class QuestionService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *     Find zero or one Question that matches the filter.
     *     @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     *     @example
     *     // Get one Question
     *     const question = await this.questionService.findUnique({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    findUnique<T extends Prisma.QuestionFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.QuestionFindUniqueArgs>, prisma: Prisma.QuestionDelegate<any> = this.prismaClient.question) {
        return prisma.findUnique<T>(args);
    }

    /**
     *        Find the first Question that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {QuestionFindFirstArgs} args - Arguments to find a Question
     *        @example
     *        // Get one Question
     *        const question = await this.questionService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.QuestionFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.QuestionFindFirstArgs>, prisma: Prisma.QuestionDelegate<any> = this.prismaClient.question) {
        return prisma.findFirst<T>(args);
    }

    /**
     *        Find zero or more Questions that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {QuestionFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all Questions
     *        const questions = await this.questionService.findMany()
     *       
     *        // Get first 10 Questions
     *        const Questions = await this.QuestionService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const questionWithIdOnly = await this.QuestionService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.QuestionFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.QuestionFindManyArgs>, prisma: Prisma.QuestionDelegate<any> = this.prismaClient.question) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a Question.
     *       @param {QuestionCreateArgs} args - Arguments to create a Question.
     *       @example
     *       // Create one Question
     *       const Question = await this.questionService.create({
     *         data: {
     *           // ... data to create a Question
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.QuestionCreateArgs>(args: Prisma.SelectSubset<T, Prisma.QuestionCreateArgs>, prisma: Prisma.QuestionDelegate<any> = this.prismaClient.question) {
        return prisma.create<T>(args);
    }

    /**
     *         Create many Questions.
     *         @param {QuestionCreateManyArgs} args - Arguments to create many a 
     *         Questions.
     *         @example
     *         // Create many Questions
     *         const Questions = await this.questionService.createMany({
     *           data: {
     *             *     // ... provide data here
     *           }
     *         })
     */
    createMany<T extends Prisma.QuestionCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.QuestionCreateManyArgs>, prisma: Prisma.QuestionDelegate<any> = this.prismaClient.question) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a Question.
     *        @param {QuestionUpdateArgs} args - Arguments to update a Question.
     *        @example
     *        // Update one Question
     *        const question = await this.questionService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.QuestionUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.QuestionUpdateArgs>, prisma: Prisma.QuestionDelegate<any> = this.prismaClient.question) {
        return prisma.update<T>(args);
    }

    /**
     *        Update 0 or more Questions.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {QuestionUpdateManyArgs} args - Arguments to update one or more Questions.
     *        @example
     *        // Update many Questions
     *        const questions = await this.questionService.updateMany({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    updateMAny<T extends Prisma.QuestionUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.QuestionUpdateManyArgs>, prisma: Prisma.QuestionDelegate<any> = this.prismaClient.question) {
        return prisma.updateMany<T>(args);
    }

    /**
     *       Create or update one Question.
     *        @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     *        @example
     *        // Upsert one Question
     *        const question = await this.questionService.upsert({
     *          create: {
     *            // ... data to create a Question
     *          },
     *          update: {
     *            // ... in case it already exists, update
     *          },
     *          where: {
     *            // ... the filter for the Question we want to update
     *          }
     *        })
     *     
     */
    upsert<T extends Prisma.QuestionUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.QuestionUpsertArgs>, prisma: Prisma.QuestionDelegate<any> = this.prismaClient.question) {
        return prisma.upsert<T>(args);
    }

    /**
     *     Delete a Question.
     *     @param {QuestionDeleteArgs} args - Arguments to delete a Question
     *     @example
     *     // Delete one Question
     *     const question = await this.questionService.delete({
     *       where: {
     *         // ... filter to delete one Question
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.QuestionDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.QuestionDeleteArgs>, prisma: Prisma.QuestionDelegate<any> = this.prismaClient.question) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more Questions.
     *     @param {QuestionDeleteArgs} args - Arguments to filter  Questions to delete.
     *     @example
     *     // Delete a few Questions
     *     const questions = await this.questionService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.QuestionDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.QuestionDeleteManyArgs>, prisma: Prisma.QuestionDelegate<any> = this.prismaClient.question) {
        return prisma.deleteMany<T>(args);
    }

    /**
     *       Count the number of Question.
     *       Note, that providing 'undefined' is treated as the value not being there.
     *       Read more here: https://pris.ly/d/null-undefined
     *       @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     *       @example
     *       // Count one Question
     *       const Question = await this.questionService.count({
     *         data: {
     *           // ... data to count a Question
     *         }
     *       })
     *     
     *     
     */
    count<T extends Prisma.QuestionCountArgs>(args: Prisma.SelectSubset<T, Prisma.QuestionCountArgs>, prisma: Prisma.QuestionDelegate<any> = this.prismaClient.question) {
        return prisma.count<T>(args);
    }

    /**
     *         Allows you to perform aggregations operations on a Question.
     *         Note, that providing 'undefined' is treated as the value not being there.
     *         Read more here: https://pris.ly/d/null-undefined
     *         @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     *         @example
     *         // Ordered by age ascending
     *         // Where email contains prisma.io
     *         // Limited to the 10 questions
     *         const aggregations = await this.questionService.aggregate({
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
    aggregate<T extends Prisma.QuestionAggregateArgs>(args: Prisma.SelectSubset<T, Prisma.QuestionAggregateArgs>, prisma: Prisma.QuestionDelegate<any> = this.prismaClient.question) {
        return prisma.aggregate<T>(args);
    }
}
