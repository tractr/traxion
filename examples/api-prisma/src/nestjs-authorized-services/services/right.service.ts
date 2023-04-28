import { Injectable, Inject } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RightService, RIGHT_SERVICE } from 'test';

@Injectable()
export class RightAuthorizedService {
  constructor(
    @Inject(RIGHT_SERVICE) private readonly rightService: RightService,
  ) {}

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
  async findUnique<T extends Prisma.RightFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.RightFindUniqueArgs>,
  ) {
    return this.rightService.findUnique<T>(args);
  }
}
