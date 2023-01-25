import { User, FindUniqueUserArgs, FindManyUserArgs, CreateOneUserArgs, UpdateOneUserArgs, DeleteOneUserArgs } from "../../generated/prisma-nestjs-graphql";
import { UserService, USER_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyUserOutput } from "./find-many-user-output.dto";

@Resolver(() => User)
export class UserResolver {
    constructor(@Inject(USER_SERVICE) private readonly userService: UserService) {
    }

    /** Query for a unique user */
    @Query(() => User, { nullable: true })
    async findUniqueUser(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueUserArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.userService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple users. */
    @Query(() => FindManyUserOutput)
    async findManyUser(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyUserArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).valueOf('users', 'User');

            const users = await this.userService.findMany({
              ...select,
              where,
              cursor,
              distinct,
              orderBy,
              skip,
              take: take + 1,
            });

            const count = await this.userService.count({
              where,
            });

            return {
              users: users.slice(0, take),
              count,
              hasNextPage: typeof users[take] !== 'undefined',
            };
          
    }

    /** Create a single user. */
    @Mutation(() => User, { nullable: true })
    async createUser(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneUserArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const data = {
              ...this.userService.getDefaultInternals(),
              ...rawData,
            };

            const user = await this.userService.create(
              { data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Update a single user. */
    @Mutation(() => User, { nullable: true })
    async updateUser(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneUserArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single User. */
    @Mutation(() => User, { nullable: true })
    async deleteUser(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneUserArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.delete(
              { where, ...select },
              prisma.user,
            );

            return user;
          
    }
}
