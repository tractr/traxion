import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@trxn/nestjs-database';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaClient: PrismaService) {}

  /**
   * Find zero or one Profile that matches the filter.
   * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
   * @example
   * // Get one Profile
   * const profile = await this.profileService.findUnique({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   */
  async findUnique<T extends Prisma.ProfileFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileFindUniqueArgs>,
    prisma: Prisma.ProfileDelegate<undefined> = this.prismaClient.profile,
  ) {
    const profile = await prisma.findUnique<T>(args);

    return profile;
  }

  /**
   * Find the first Profile that matches the filter.
   * Note, that providing 'undefined' is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
   * @example
   * // Get one Profile
   * const profile = await this.profileService.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  async findFirst<T extends Prisma.ProfileFindFirstArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileFindFirstArgs>,
    prisma: Prisma.ProfileDelegate<undefined> = this.prismaClient.profile,
  ) {
    const profile = await prisma.findFirst<T>(args);

    return profile;
  }

  /**
   * Find zero or more Profiles that matches the filter.
   * Note, that providing 'undefined' is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ProfileFindManyArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Profiles
   * const profiles = await this.profileService.findMany()
   *
   * // Get first 10 Profiles
   * const Profiles = await this.ProfileService.findMany({ take: 10 })
   *
   * // Only select the 'id'
   * const profileWithIdOnly = await this.ProfileService.findMany({ select: { id: true } })
   */
  async findMany<T extends Prisma.ProfileFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileFindManyArgs>,
    prisma: Prisma.ProfileDelegate<undefined> = this.prismaClient.profile,
  ) {
    const profiles = await prisma.findMany<T>(args);

    return profiles;
  }

  /**
   * Create a Profile.
   * @param {ProfileCreateArgs} args - Arguments to create a Profile.
   * @example
   * // Create one Profile
   * const Profile = await this.profileService.create({
   *   data: {
   *     // ... data to create a Profile
   *   }
   * })
   */
  async create<T extends Prisma.ProfileCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileCreateArgs>,
    prisma: Prisma.ProfileDelegate<undefined> = this.prismaClient.profile,
  ) {
    const profile = await prisma.create<T>(args);
    return profile;
  }

  /**
   * Create many Profiles.
   *
   * @example
   * // Create many Profiles
   * const Profiles = await this.profileService.createMany({
   *   data: {
   *     // ... provide data here
   *   }
   * })
   */
  async createMany<T extends Prisma.ProfileCreateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileCreateManyArgs>,
    prisma: Prisma.ProfileDelegate<undefined> = this.prismaClient.profile,
  ) {
    return prisma.createMany<T>(args);
  }

  /**
   * Update a Profile.
   * @param {ProfileUpdateArgs} args - Arguments to update a Profile.
   * @example
   * // Update one Profile
   * const profile = await this.profileService.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   */
  async update<T extends Prisma.ProfileUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileUpdateArgs>,
    prisma: Prisma.ProfileDelegate<undefined> = this.prismaClient.profile,
  ) {
    const profile = await prisma.update<T>(args);
    return profile;
  }

  /**
   * Update 0 or more Profiles.
   * Note, that providing 'undefined' is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ProfileUpdateManyArgs} args - Arguments to update one or more Profiles.
   * @example
   * // Update many Profiles
   * const profiles = await this.profileService.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   */
  async updateMany<T extends Prisma.ProfileUpdateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileUpdateManyArgs>,
    prisma: Prisma.ProfileDelegate<undefined> = this.prismaClient.profile,
  ) {
    return prisma.updateMany<T>(args);
  }

  /**
   * Create or update one Profile.
   *  @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
   *  @example
   *  // Upsert one Profile
   *  const profile = await this.profileService.upsert({
   *    create: {
   *      // ... data to create a Profile
   *    },
   *    update: {
   *      // ... in case it already exists, update
   *    },
   *    where: {
   *      // ... the filter for the Profile we want to update
   *    }
   *  })
   */
  async upsert<T extends Prisma.ProfileUpsertArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileUpsertArgs>,
    prisma: Prisma.ProfileDelegate<undefined> = this.prismaClient.profile,
  ) {
    const profile = await prisma.upsert<T>(args);
    return profile;
  }

  /**
   * Delete a Profile.
   * @param {ProfileDeleteArgs} args - Arguments to delete a Profile
   * @example
   * // Delete one Profile
   * const profile = await this.profileService.delete({
   *   where: {
   *     // ... filter to delete one Profile
   *   }
   * })
   *
   */
  async delete<T extends Prisma.ProfileDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileDeleteArgs>,
    prisma: Prisma.ProfileDelegate<undefined> = this.prismaClient.profile,
  ) {
    const profile = await prisma.delete<T>(args);

    return profile;
  }

  /**
   * Delete 0 or more Profiles.
   * @param {ProfileDeleteArgs} args - Arguments to filter  Profiles to delete.
   * @example
   * // Delete a few Profiles
   * const profiles = await this.profileService.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   */
  async deleteMany<T extends Prisma.ProfileDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileDeleteManyArgs>,
    prisma: Prisma.ProfileDelegate<undefined> = this.prismaClient.profile,
  ) {
    return prisma.deleteMany<T>(args);
  }

  /**
   * Count the number of Profile.
   * Note, that providing 'undefined' is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
   * @example
   * // Count one Profile
   * const Profile = await this.profileService.count({
   *   data: {
   *     // ... data to count a Profile
   *   }
   * })
   */
  async count<T extends Prisma.ProfileCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileCountArgs>,
    prisma: Prisma.ProfileDelegate<undefined> = this.prismaClient.profile,
  ) {
    return prisma.count<T>(args);
  }

  /**
   * Allows you to perform aggregations operations on a Profile.
   * Note, that providing 'undefined' is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
   * @example
   * // Ordered by age ascending
   * // Where email contains prisma.io
   * // Limited to the 10 profiles
   * const aggregations = await this.profileService.aggregate({
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
   */
  async aggregate<T extends Prisma.ProfileAggregateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProfileAggregateArgs>,
    prisma: Prisma.ProfileDelegate<undefined> = this.prismaClient.profile,
  ) {
    return prisma.aggregate<T>(args);
  }
}
