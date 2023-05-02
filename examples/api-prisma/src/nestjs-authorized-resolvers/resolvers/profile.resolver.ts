import { Profile, User, FindUniqueProfileArgs, FindManyProfileArgs, CreateOneProfileArgs, UpdateOneProfileArgs, DeleteOneProfileArgs } from "../../nestjs-graphql-dtos";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { Prisma } from "@prisma/client";
import { getPathFromGraphQLResolveInfo } from "@trxn/nestjs-graphql";
import { GraphQLResolveInfo } from "graphql";
import { FindManyProfileOutput } from "../dtos";
import { CREATE_PROFILE, READ_PROFILE, SEARCH_PROFILE, UPDATE_PROFILE, DELETE_PROFILE, AppAbility } from "../../casl-target";
import { ProfileAuthorizedService, UserAuthorizedService } from "../../nestjs-authorized-services";
import { CurrentAbilities, Policies } from "@trxn/nestjs-core";

@Resolver(() => Profile)
export class ProfileResolver {
    constructor(private readonly profileAuthorizedService: ProfileAuthorizedService, private readonly userAuthorizedService: UserAuthorizedService) {
    }

    /** Query for a unique profile */
    @Query(() => Profile, { nullable: true })
    @Policies(READ_PROFILE)
    async findUniqueProfile(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueProfileArgs, @CurrentAbilities() abilities: AppAbility) {

            const select = new PrismaSelect(info).value as Prisma.ProfileArgs;
            const profile =  await this.profileAuthorizedService.findUnique({where, ...select}, abilities);
            return profile;
          
    }

    /** Query for multiple profiles. */
    @Query(() => FindManyProfileOutput)
    @Policies(SEARCH_PROFILE)
    async findManyProfiles(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyProfileArgs, @CurrentAbilities() abilities: AppAbility) {

            const select = new PrismaSelect(info).valueOf('profiles', 'Profile') as Prisma.ProfileArgs;

            const profiles = await this.profileAuthorizedService.findMany({
              ...select,
              where,
              cursor,
              distinct,
              orderBy,
              skip,
              take: take + 1,
            }, abilities);

            const count = await this.profileAuthorizedService.count({
              where,
            }, abilities);

            return {
              profiles: profiles.slice(0, take),
              count,
              hasNextPage: typeof profiles[take] !== 'undefined',
            };
          
    }

    /** Create a single profile. */
    @Mutation(() => Profile, { nullable: true })
    @Policies(CREATE_PROFILE)
    async createProfile(@Info() info: GraphQLResolveInfo, @Args() { data }: CreateOneProfileArgs, @CurrentAbilities() abilities: AppAbility) {

            const select = new PrismaSelect(info).value as Prisma.ProfileArgs;

            const profile = await this.profileAuthorizedService.create({ data, ...select }, abilities);

            return profile;
          
    }

    /** Update a single profile. */
    @Mutation(() => Profile, { nullable: true })
    @Policies(UPDATE_PROFILE)
    async updateProfile(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneProfileArgs, @CurrentAbilities() abilities: AppAbility) {

            const select = new PrismaSelect(info).value as Prisma.ProfileArgs;

            const profile = await this.profileAuthorizedService.update({ where, data, ...select }, abilities);

            return profile;
          
    }

    /** Delete a single Profile. */
    @Mutation(() => Profile, { nullable: true })
    @Policies(DELETE_PROFILE)
    async deleteProfile(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneProfileArgs, @CurrentAbilities() abilities: AppAbility) {

            const select = new PrismaSelect(info).value as Prisma.ProfileArgs;

            const profile = await this.profileAuthorizedService.delete({ where, ...select }, abilities);

            return profile;
          
    }

    @ResolveField(() => User)
    async user(@Info() info: GraphQLResolveInfo, @Parent() profile: Profile) {

          let { user } = profile;

          if (typeof user === 'undefined') {
            if (!profile.userId) {
              throw new Error('user not found when fetching user');
            }

            const select = new PrismaSelect(info, {
              // defaultFields: OWNERS_DEFAULT_FIELDS,
            }).valueOf(
              getPathFromGraphQLResolveInfo(info.path),
              'User'
            ) as Prisma.UserArgs;

            const findUnique =  await this.userAuthorizedService.findUnique({
              where: { id: profile.userId },,
              ...select,
            }, abilities);

            user = findUnique || undefined;
          }

          return user;
          
    }
}
