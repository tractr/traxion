import { StringModel, FindUniqueStringModelArgs, FindManyStringModelArgs, CreateOneStringModelArgs, UpdateOneStringModelArgs, DeleteOneStringModelArgs } from "../../generated/prisma-nestjs-graphql";
import { StringModelService, STRING_MODEL_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyStringModelOutput } from "./find-many-string-model-output.dto";

@Resolver(() => StringModel)
export class StringModelResolver {
    constructor(@Inject(STRING_MODEL_SERVICE) private readonly stringModelService: StringModelService) {
    }

    /** Query for a unique stringModel */
    @Query(() => StringModel, { nullable: true })
    async findUniqueStringModel(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueStringModelArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.stringModelService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple stringModels. */
    @Query(() => FindManyStringModelOutput)
    async findManyStringModel(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyStringModelArgs) {

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

    /** Create a single stringModel. */
    @Mutation(() => StringModel, { nullable: true })
    async createStringModel(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneStringModelArgs) {

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

    /** Update a single stringModel. */
    @Mutation(() => StringModel, { nullable: true })
    async updateStringModel(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneStringModelArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single StringModel. */
    @Mutation(() => StringModel, { nullable: true })
    async deleteStringModel(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneStringModelArgs) {

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
