import { UniqueValueField, FindUniqueUniqueValueFieldArgs, FindManyUniqueValueFieldArgs, CreateOneUniqueValueFieldArgs, UpdateOneUniqueValueFieldArgs, DeleteOneUniqueValueFieldArgs } from "../../generated/prisma-nestjs-graphql";
import { UniqueValueFieldService, UNIQUE_VALUE_FIELD_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyUniqueValueFieldOutput } from "./find-many-unique-value-field-output.dto";

@Resolver(() => UniqueValueField)
export class UniqueValueFieldResolver {
    constructor(@Inject(UNIQUE_VALUE_FIELD_SERVICE) private readonly uniqueValueFieldService: UniqueValueFieldService) {
    }

    /** Query for a unique uniqueValueField */
    @Query(() => UniqueValueField, { nullable: true })
    async findUniqueUniqueValueField(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueUniqueValueFieldArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.uniqueValueFieldService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple uniqueValueFields. */
    @Query(() => FindManyUniqueValueFieldOutput)
    async findManyUniqueValueField(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyUniqueValueFieldArgs) {

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

    /** Create a single uniqueValueField. */
    @Mutation(() => UniqueValueField, { nullable: true })
    async createUniqueValueField(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneUniqueValueFieldArgs) {

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

    /** Update a single uniqueValueField. */
    @Mutation(() => UniqueValueField, { nullable: true })
    async updateUniqueValueField(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneUniqueValueFieldArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single UniqueValueField. */
    @Mutation(() => UniqueValueField, { nullable: true })
    async deleteUniqueValueField(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneUniqueValueFieldArgs) {

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
