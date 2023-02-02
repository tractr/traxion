/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_SERVICE } from '@trxn/nestjs-database';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class AnswerService {
  constructor(
    @Inject(DATABASE_SERVICE)
    protected readonly prismaClient: PrismaClient,
  ) {}

  /**
   *  Return default internal fields
   **/
  public getDefaultInternals() {
    return {
      createdAt: this.getDefaultCreatedAt(),
    };
  }

  /**
   * Return default value for internal field 'createdAt'
   * */
  public getDefaultCreatedAt() {
    return new Date();
  }

  /**
   * Find zero or one Answer that matches the filter.
   * @param {AnswerFindUniqueArgs} args - Arguments to find a Answer
   * @example
   * // Get one Answer
   * const answer = await this.answerService.findUnique({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * */
  public findUnique<T extends Prisma.AnswerFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.AnswerFindUniqueArgs>,
    prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer,
  ) {
    return prisma.findUnique<T>(args);
  }

  /**
   * Find the first Answer that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {AnswerFindFirstArgs} args - Arguments to find a Answer
   * @example
   * // Get one Answer
   * const answer = await this.answerService.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * */
  public findFirst<T extends Prisma.AnswerFindFirstArgs>(
    args?: Prisma.SelectSubset<T, Prisma.AnswerFindFirstArgs>,
    prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer,
  ) {
    return prisma.findFirst<T>(args);
  }

  /**
   * Find zero or more Answers that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {AnswerFindManyArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Answers
   * const answers = await this.answerService.findMany()
   *
   * // Get first 10 Answers
   * const answers = await this.answerService.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const answerWithIdOnly = await this.answerService.findMany({ select: { id: true } })
   *
   * */
  public findMany<T extends Prisma.AnswerFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.AnswerFindManyArgs>,
    prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer,
  ) {
    return prisma.findMany<T>(args);
  }

  /**
   * Create a Answer.
   * @param {AnswerCreateArgs} args - Arguments to create a Answer.
   * @example
   * // Create one Answer
   * const Answer = await this.answerService.create({
   *   data: {
   *     // ... data to create a Answer
   *   }
   * })
   *
   * */
  public create<T extends Prisma.AnswerCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AnswerCreateArgs>,
    prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer,
  ) {
    return prisma.create<T>(args);
  }

  /**
   * Create many Answers.
   * @param {AnswerCreateManyArgs} args - Arguments to create many Answers.
   * @example
   * // Create many Answers
   * const answer = await this.answerService.createMany({
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   * */
  public createMany<T extends Prisma.AnswerCreateManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.AnswerCreateManyArgs>,
    prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer,
  ) {
    return prisma.createMany<T>(args);
  }

  /**
   * Delete a Answer.
   * @param {AnswerDeleteArgs} args - Arguments to delete one Answer.
   * @example
   * // Delete one Answer
   * const Answer = await this.answerService.delete({
   *   where: {
   *     // ... filter to delete one Answer
   *   }
   * })
   *
   * */
  public delete<T extends Prisma.AnswerDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.AnswerDeleteArgs>,
    prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer,
  ) {
    return prisma.delete<T>(args);
  }

  /**
   * Update one Answer.
   * @param {AnswerUpdateArgs} args - Arguments to update one Answer.
   * @example
   * // Update one Answer
   * const answer = await this.answerService.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   * */
  public update<T extends Prisma.AnswerUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AnswerUpdateArgs>,
    prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer,
  ) {
    return prisma.update<T>(args);
  }

  /**
   * Delete zero or more Answers.
   * @param {AnswerDeleteManyArgs} args - Arguments to filter Answers to delete.
   * @example
   * // Delete a few Answers
   * const { count } = await this.answerService.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   * */
  public deleteMany<T extends Prisma.AnswerDeleteManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.AnswerDeleteManyArgs>,
    prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer,
  ) {
    return prisma.deleteMany<T>(args);
  }

  /**
   * Update zero or more Answers.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {AnswerUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Answers
   * const answer = await this.answerService.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   * */
  public updateMany<T extends Prisma.AnswerUpdateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AnswerUpdateManyArgs>,
    prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer,
  ) {
    return prisma.updateMany<T>(args);
  }

  /**
   * Create or update one Answer.
   * @param {AnswerUpsertArgs} args - Arguments to update or create a Answer.
   * @example
   * // Update or create a Answer
   * const answer = await this.answerService.upsert({
   *   create: {
   *     // ... data to create a Answer
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Answer we want to update
   *   }
   * })
   * */
  public upsert<T extends Prisma.AnswerUpsertArgs>(
    args: Prisma.SelectSubset<T, Prisma.AnswerUpsertArgs>,
    prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer,
  ) {
    return prisma.upsert<T>(args);
  }

  /**
   * Count the number of Answers.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {AnswerCountArgs} args - Arguments to filter Answers to count.
   * @example
   * // Count the number of Answers
   * const count = await this.answerService.count({
   *   where: {
   *     // ... the filter for the Answers we want to count
   *   }
   * })
   * */
  public count<T extends Prisma.AnswerCountArgs>(
    args?: Prisma.Subset<T, Prisma.AnswerCountArgs>,
    prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer,
  ) {
    return prisma.count<T>(args);
  }

  /**
   * Allows you to perform aggregations operations on a Answer.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {AnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
   * @example
   * // Ordered by age ascending
   * // Where email contains prisma.io
   * // Limited to the 10 answers
   * const aggregations = await this.answerService.aggregate({
   *   avg: {
   *     age: true,
   *   },
   *   where: {
   *     email: {
   *       contains: "prisma.io",
   *     },
   *   },
   *   orderBy: {
   *     age: "asc",
   *   },
   *   take: 10,
   * })
   * */
  public aggregate<T extends Prisma.AnswerAggregateArgs>(
    args: Prisma.Subset<T, Prisma.AnswerAggregateArgs>,
    prisma: Prisma.AnswerDelegate<any> = this.prismaClient.answer,
  ) {
    return prisma.aggregate<T>(args);
  }
}
