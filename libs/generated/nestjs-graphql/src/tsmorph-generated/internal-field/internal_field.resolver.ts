import { InternalField, FindUniqueInternalFieldArgs, FindManyInternalFieldArgs, CreateOneInternalFieldArgs, UpdateOneInternalFieldArgs, DeleteOneInternalFieldArgs } from "../../generated/prisma-nestjs-graphql";
import { InternalFieldService, INTERNAL_FIELD_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyInternalFieldOutput } from "./find-many-internal-field-output.dto";

@Resolver(() => InternalField)
export class InternalFieldResolver {
    constructor(@Inject(INTERNAL_FIELD_SERVICE) private readonly internalFieldService: InternalFieldService) {
    }

    /** Query for a unique internalField */
    @Query(() => InternalField, { nullable: true })
    async findUniqueInternalField(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueInternalFieldArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.internalFieldService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple internalFields. */
    @Query(() => FindManyInternalFieldOutput)
    async findManyInternalField(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyInternalFieldArgs) {

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

    /** Create a single internalField. */
    @Mutation(() => InternalField, { nullable: true })
    async createInternalField(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneInternalFieldArgs) {

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

    /** Update a single internalField. */
    @Mutation(() => InternalField, { nullable: true })
    async updateInternalField(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneInternalFieldArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single InternalField. */
    @Mutation(() => InternalField, { nullable: true })
    async deleteInternalField(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneInternalFieldArgs) {

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
