import { StringModelUnique, FindUniqueStringModelUniqueArgs, FindManyStringModelUniqueArgs, CreateOneStringModelUniqueArgs, UpdateOneStringModelUniqueArgs, DeleteOneStringModelUniqueArgs } from "../../generated/prisma-nestjs-graphql";
import { StringModelUniqueService, STRING_MODEL_UNIQUE_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyStringModelUniqueOutput } from "./find-many-string-model-unique-output.dto";

@Resolver(() => StringModelUnique)
export class StringModelUniqueResolver {
    constructor(@Inject(STRING_MODEL_UNIQUE_SERVICE) private readonly stringModelUniqueService: StringModelUniqueService) {
    }

    /** Query for a unique stringModelUnique */
    @Query(() => StringModelUnique, { nullable: true })
    async findUniqueStringModelUnique(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueStringModelUniqueArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.stringModelUniqueService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple stringModelUniques. */
    @Query(() => FindManyStringModelUniqueOutput)
    async findManyStringModelUnique(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyStringModelUniqueArgs) {

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

    /** Create a single stringModelUnique. */
    @Mutation(() => StringModelUnique, { nullable: true })
    async createStringModelUnique(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneStringModelUniqueArgs) {

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

    /** Update a single stringModelUnique. */
    @Mutation(() => StringModelUnique, { nullable: true })
    async updateStringModelUnique(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneStringModelUniqueArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single StringModelUnique. */
    @Mutation(() => StringModelUnique, { nullable: true })
    async deleteStringModelUnique(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneStringModelUniqueArgs) {

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
