import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@trxn/nestjs-database';

@Injectable()
export class RightService {
  constructor(private readonly prismaClient: PrismaService) {}

  /**
   *     Find zero or one Right that matches the filter.
   *     @param {RightFindUniqueArgs} args - Arguments to find a Right
   *     @example
   *     // Get one Right
   *     const right = await this.rightService.findUnique({
   *       where: {
   *         // ... provide filter here
   *       }
   *     })
   *
   */
  findUnique<T extends Prisma.RightFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightFindUniqueArgs>,
    prisma: Prisma.RightDelegate<any> = this.prismaClient.right,
  ) {
    return prisma.findUnique<T>(args);
  }

  /**
   *        Find the first Right that matches the filter.
   *        Note, that providing 'undefined' is treated as the value not being there.
   *        Read more here: https://pris.ly/d/null-undefined
   *        @param {RightFindFirstArgs} args - Arguments to find a Right
   *        @example
   *        // Get one Right
   *        const right = await this.rightService.findFirst({
   *          where: {
   *            // ... provide filter here
   *          }
   *        })
   *
   */
  findFirst<T extends Prisma.RightFindFirstArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightFindFirstArgs>,
    prisma: Prisma.RightDelegate<any> = this.prismaClient.right,
  ) {
    return prisma.findFirst<T>(args);
  }

  /**
   *        Find zero or more Rights that matches the filter.
   *        Note, that providing 'undefined' is treated as the value not being there.
   *        Read more here: https://pris.ly/d/null-undefined
   *        @param {RightFindManyArgs=} args - Arguments to filter and select certain fields only.
   *        @example
   *        // Get all Rights
   *        const rights = await this.rightService.findMany()
   *
   *        // Get first 10 Rights
   *        const Rights = await this.RightService.findMany({ take: 10 })
   *
   *        // Only select the 'id'
   *        const rightWithIdOnly = await this.RightService.findMany({ select: { id: true } })
   *
   *
   */
  findMany<T extends Prisma.RightFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightFindManyArgs>,
    prisma: Prisma.RightDelegate<any> = this.prismaClient.right,
  ) {
    return prisma.findMany<T>(args);
  }

  /**
   *       Create a Right.
   *       @param {RightCreateArgs} args - Arguments to create a Right.
   *       @example
   *       // Create one Right
   *       const Right = await this.rightService.create({
   *         data: {
   *           // ... data to create a Right
   *         }
   *       })
   *
   *
   */
  create<T extends Prisma.RightCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightCreateArgs>,
    prisma: Prisma.RightDelegate<any> = this.prismaClient.right,
  ) {
    return prisma.create<T>(args);
  }

  /**
   *         Create many Rights.
   *         @param {RightCreateManyArgs} args - Arguments to create many a
   *         Rights.
   *         @example
   *         // Create many Rights
   *         const Rights = await this.rightService.createMany({
   *           data: {
   *             *     // ... provide data here
   *           }
   *         })
   */
  createMany<T extends Prisma.RightCreateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightCreateManyArgs>,
    prisma: Prisma.RightDelegate<any> = this.prismaClient.right,
  ) {
    return prisma.createMany<T>(args);
  }

  /**
   *        Update a Right.
   *        @param {RightUpdateArgs} args - Arguments to update a Right.
   *        @example
   *        // Update one Right
   *        const right = await this.rightService.update({
   *          where: {
   *            // ... provide filter here
   *          },
   *          data: {
   *            // ... provide data here
   *          }
   *        })
   *
   */
  update<T extends Prisma.RightUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightUpdateArgs>,
    prisma: Prisma.RightDelegate<any> = this.prismaClient.right,
  ) {
    return prisma.update<T>(args);
  }

  /**
   *        Update 0 or more Rights.
   *        Note, that providing 'undefined' is treated as the value not being there.
   *        Read more here: https://pris.ly/d/null-undefined
   *        @param {RightUpdateManyArgs} args - Arguments to update one or more Rights.
   *        @example
   *        // Update many Rights
   *        const rights = await this.rightService.updateMany({
   *          where: {
   *            // ... provide filter here
   *          },
   *          data: {
   *            // ... provide data here
   *          }
   *        })
   *
   */
  updateMAny<T extends Prisma.RightUpdateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightUpdateManyArgs>,
    prisma: Prisma.RightDelegate<any> = this.prismaClient.right,
  ) {
    return prisma.updateMany<T>(args);
  }

  /**
   *       Create or update one Right.
   *        @param {RightUpsertArgs} args - Arguments to update or create a Right.
   *        @example
   *        // Upsert one Right
   *        const right = await this.rightService.upsert({
   *          create: {
   *            // ... data to create a Right
   *          },
   *          update: {
   *            // ... in case it already exists, update
   *          },
   *          where: {
   *            // ... the filter for the Right we want to update
   *          }
   *        })
   *
   */
  upsert<T extends Prisma.RightUpsertArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightUpsertArgs>,
    prisma: Prisma.RightDelegate<any> = this.prismaClient.right,
  ) {
    return prisma.upsert<T>(args);
  }

  /**
   *     Delete a Right.
   *     @param {RightDeleteArgs} args - Arguments to delete a Right
   *     @example
   *     // Delete one Right
   *     const right = await this.rightService.delete({
   *       where: {
   *         // ... filter to delete one Right
   *       }
   *     })
   *
   */
  delete<T extends Prisma.RightDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightDeleteArgs>,
    prisma: Prisma.RightDelegate<any> = this.prismaClient.right,
  ) {
    return prisma.delete<T>(args);
  }

  /**
   *     Delete 0 or more Rights.
   *     @param {RightDeleteArgs} args - Arguments to filter  Rights to delete.
   *     @example
   *     // Delete a few Rights
   *     const rights = await this.rightService.deleteMany({
   *       where: {
   *         // ... provide filter here
   *       }
   *     })
   *
   */
  deleteMany<T extends Prisma.RightDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightDeleteManyArgs>,
    prisma: Prisma.RightDelegate<any> = this.prismaClient.right,
  ) {
    return prisma.deleteMany<T>(args);
  }

  /**
   *       Count the number of Right.
   *       Note, that providing 'undefined' is treated as the value not being there.
   *       Read more here: https://pris.ly/d/null-undefined
   *       @param {RightCountArgs} args - Arguments to filter Rights to count.
   *       @example
   *       // Count one Right
   *       const Right = await this.rightService.count({
   *         data: {
   *           // ... data to count a Right
   *         }
   *       })
   *
   *
   */
  count<T extends Prisma.RightCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightCountArgs>,
    prisma: Prisma.RightDelegate<any> = this.prismaClient.right,
  ) {
    return prisma.count<T>(args);
  }

  /**
   *         Allows you to perform aggregations operations on a Right.
   *         Note, that providing 'undefined' is treated as the value not being there.
   *         Read more here: https://pris.ly/d/null-undefined
   *         @param {RightAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
   *         @example
   *         // Ordered by age ascending
   *         // Where email contains prisma.io
   *         // Limited to the 10 rights
   *         const aggregations = await this.rightService.aggregate({
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
  aggregate<T extends Prisma.RightAggregateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightAggregateArgs>,
    prisma: Prisma.RightDelegate<any> = this.prismaClient.right,
  ) {
    return prisma.aggregate<T>(args);
  }
}
