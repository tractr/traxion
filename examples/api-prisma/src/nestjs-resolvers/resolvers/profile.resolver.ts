import {
  Args,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { Prisma } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';

import {
  CreateOneProfileArgs,
  DeleteOneProfileArgs,
  FindManyProfileArgs,
  FindUniqueProfileArgs,
  Profile,
  UpdateOneProfileArgs,
  User,
} from '../../nestjs-graphql-dtos';
import { ProfileService, UserService } from '../../nestjs-services';
import { FindManyProfileOutput } from '../dtos';

import { getPathFromGraphQLResolveInfo } from '@trxn/nestjs-graphql';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
  ) {}

  /** Query for a unique profile */
  @Query(() => Profile, { nullable: true })
  async findUniqueProfile(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true, defaultValue: {} })
    { where }: FindUniqueProfileArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.ProfileArgs;
    const profile = await this.profileService.findUnique({ where, ...select });
    return profile;
  }

  /** Query for multiple profiles. */
  @Query(() => FindManyProfileOutput)
  async findManyProfiles(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true })
    {
      where,
      cursor,
      distinct,
      orderBy = [{ id: 'asc' }],
      skip = 0,
      take = 100,
    }: FindManyProfileArgs,
  ) {
    const select = new PrismaSelect(info).valueOf(
      'profiles',
      'Profile',
    ) as Prisma.ProfileArgs;

    const profiles = await this.profileService.findMany({
      ...select,
      where,
      cursor,
      distinct,
      orderBy,
      skip,
      take: take + 1,
    });

    const count = await this.profileService.count({
      where,
    });

    return {
      profiles: profiles.slice(0, take),
      count,
      hasNextPage: typeof profiles[take] !== 'undefined',
    };
  }

  /** Create a single profile. */
  @Mutation(() => Profile, { nullable: true })
  async createProfile(
    @Info() info: GraphQLResolveInfo,
    @Args() { data }: CreateOneProfileArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.ProfileArgs;

    const profile = await this.profileService.create({ data, ...select });

    return profile;
  }

  /** Update a single profile. */
  @Mutation(() => Profile, { nullable: true })
  async updateProfile(
    @Info() info: GraphQLResolveInfo,
    @Args() { data, where }: UpdateOneProfileArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.ProfileArgs;

    const profile = await this.profileService.update({
      where,
      data,
      ...select,
    });

    return profile;
  }

  /** Delete a single Profile. */
  @Mutation(() => Profile, { nullable: true })
  async deleteProfile(
    @Info() info: GraphQLResolveInfo,
    @Args() { where }: DeleteOneProfileArgs,
  ) {
    const select = new PrismaSelect(info).value as Prisma.ProfileArgs;

    const profile = await this.profileService.delete({ where, ...select });

    return profile;
  }

  @ResolveField(() => User)
  async user(@Info() info: GraphQLResolveInfo, @Parent() profile: Profile) {
    let { user } = profile;

    if (typeof user === 'undefined') {
      if (!profile.userId) {
        throw new Error('user not found when fetching user');
      }

      const select = new PrismaSelect(info).valueOf(
        getPathFromGraphQLResolveInfo(info.path),
        'User',
      ) as Prisma.UserArgs;

      const findUnique = await this.userService.findUnique({
        where: { id: profile.userId },
        ...select,
      });

      user = findUnique || undefined;
    }

    return user;
  }
}
