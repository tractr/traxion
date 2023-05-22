import { ForcedSubject, PureAbility } from '@casl/ability';
import { PrismaQuery } from '@casl/prisma';
import { Inject } from '@nestjs/common';
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
  DEFAULT_OWNERSHIP_SELECT,
  DefaultOwnershipSelect,
  ProfileAuthorizedService,
  UserAuthorizedService,
} from '../../nestjs-authorized-services';
import {
  CreateOneProfileArgs,
  DeleteOneProfileArgs,
  FindManyProfileArgs,
  FindUniqueProfileArgs,
  Profile,
  UpdateOneProfileArgs,
  User,
} from '../../nestjs-graphql-dtos';
import { FindManyProfileOutput } from '../dtos';
import {
  CREATE_PROFILE,
  DELETE_PROFILE,
  READ_PROFILE,
  SEARCH_PROFILE,
  UPDATE_PROFILE,
} from '../policies';

import { CurrentAbilities, Policies } from '@trxn/nestjs-core';
import { getPathFromGraphQLResolveInfo } from '@trxn/nestjs-graphql';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileAuthorizedService: ProfileAuthorizedService,
    private readonly userAuthorizedService: UserAuthorizedService,
    @Inject(DEFAULT_OWNERSHIP_SELECT)
    private readonly defaultFields: DefaultOwnershipSelect,
  ) {}

  /** Query for a unique profile */
  @Query(() => Profile, { nullable: true })
  @Policies(READ_PROFILE)
  async findUniqueProfile(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true, defaultValue: {} })
    { where }: FindUniqueProfileArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, { defaultFields: this.defaultFields })
      .value as Prisma.ProfileArgs;
    const profile = await this.profileAuthorizedService.findUnique(
      { where, ...select },
      abilities,
    );
    return profile;
  }

  /** Query for multiple profiles. */
  @Query(() => FindManyProfileOutput)
  @Policies(SEARCH_PROFILE)
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
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, {
      defaultFields: this.defaultFields,
    }).valueOf('profiles', 'Profile') as Prisma.ProfileArgs;

    const profiles = await this.profileAuthorizedService.findMany(
      {
        ...select,
        where,
        cursor,
        distinct,
        orderBy,
        skip,
        take: take + 1,
      },
      abilities,
    );

    const count = await this.profileAuthorizedService.count(
      {
        where,
      },
      abilities,
    );

    return {
      profiles: profiles.slice(0, take),
      count,
      hasNextPage: typeof profiles[take] !== 'undefined',
    };
  }

  /** Create a single profile. */
  @Mutation(() => Profile, { nullable: true })
  @Policies(CREATE_PROFILE)
  async createProfile(
    @Info() info: GraphQLResolveInfo,
    @Args() { data }: CreateOneProfileArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, { defaultFields: this.defaultFields })
      .value as Prisma.ProfileArgs;

    const profile = await this.profileAuthorizedService.create(
      { data, ...select },
      abilities,
    );

    return profile;
  }

  /** Update a single profile. */
  @Mutation(() => Profile, { nullable: true })
  @Policies(UPDATE_PROFILE)
  async updateProfile(
    @Info() info: GraphQLResolveInfo,
    @Args() { data, where }: UpdateOneProfileArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, { defaultFields: this.defaultFields })
      .value as Prisma.ProfileArgs;

    const profile = await this.profileAuthorizedService.update(
      { where, data, ...select },
      abilities,
    );

    return profile;
  }

  /** Delete a single Profile. */
  @Mutation(() => Profile, { nullable: true })
  @Policies(DELETE_PROFILE)
  async deleteProfile(
    @Info() info: GraphQLResolveInfo,
    @Args() { where }: DeleteOneProfileArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info, { defaultFields: this.defaultFields })
      .value as Prisma.ProfileArgs;

    const profile = await this.profileAuthorizedService.delete(
      { where, ...select },
      abilities,
    );

    return profile;
  }

  @ResolveField(() => User)
  async user(
    @Info() info: GraphQLResolveInfo,
    @Parent() profile: Profile,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    let { user } = profile;

    if (typeof user === 'undefined') {
      if (!profile.userId) {
        throw new Error('user not found when fetching user');
      }

      const select = new PrismaSelect(info, {
        defaultFields: this.defaultFields,
      }).valueOf(
        getPathFromGraphQLResolveInfo(info.path),
        'User',
      ) as Prisma.UserArgs;

      const findUnique = await this.userAuthorizedService.findUnique(
        {
          where: { id: profile.userId },
          ...select,
        },
        abilities,
      );

      user = findUnique || undefined;
    }

    return user;
  }
}
