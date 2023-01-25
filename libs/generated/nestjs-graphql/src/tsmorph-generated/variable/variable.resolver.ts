import { Variable, FindUniqueVariableArgs, FindManyVariableArgs, CreateOneVariableArgs, UpdateOneVariableArgs, DeleteOneVariableArgs } from "../../generated/prisma-nestjs-graphql";
import { VariableService, VARIABLE_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyVariableOutput } from "./find-many-variable-output.dto";

@Resolver(() => Variable)
export class VariableResolver {
    constructor(@Inject(VARIABLE_SERVICE) private readonly variableService: VariableService) {
    }

    /** Query for a unique variable */
    @Query(() => Variable, { nullable: true })
    async findUniqueVariable(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueVariableArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.variableService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple variables. */
    @Query(() => FindManyVariableOutput)
    async findManyVariable(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyVariableArgs) {

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

    /** Create a single variable. */
    @Mutation(() => Variable, { nullable: true })
    async createVariable(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneVariableArgs) {

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

    /** Update a single variable. */
    @Mutation(() => Variable, { nullable: true })
    async updateVariable(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneVariableArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single Variable. */
    @Mutation(() => Variable, { nullable: true })
    async deleteVariable(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneVariableArgs) {

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
