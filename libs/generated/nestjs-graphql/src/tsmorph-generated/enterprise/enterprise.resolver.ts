import { Enterprise, Department, User, FindUniqueEnterpriseArgs, FindManyEnterpriseArgs, CreateOneEnterpriseArgs, UpdateOneEnterpriseArgs, DeleteOneEnterpriseArgs } from "../../generated/prisma-nestjs-graphql";
import { EnterpriseService, ENTERPRISE_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyEnterpriseOutput } from "./find-many-enterprise-output.dto";

@Resolver(() => Enterprise)
export class EnterpriseResolver {
    constructor(@Inject(ENTERPRISE_SERVICE) private readonly enterpriseService: EnterpriseService) {
    }

    /** Query for a unique enterprise */
    @Query(() => Enterprise, { nullable: true })
    async findUniqueEnterprise(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueEnterpriseArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.enterpriseService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple enterprises. */
    @Query(() => FindManyEnterpriseOutput)
    async findManyEnterprise(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyEnterpriseArgs) {

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

    /** Create a single enterprise. */
    @Mutation(() => Enterprise, { nullable: true })
    async createEnterprise(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneEnterpriseArgs) {

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

    /** Update a single enterprise. */
    @Mutation(() => Enterprise, { nullable: true })
    async updateEnterprise(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneEnterpriseArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single Enterprise. */
    @Mutation(() => Enterprise, { nullable: true })
    async deleteEnterprise(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneEnterpriseArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.delete(
              { where, ...select },
              prisma.user,
            );

            return user;
          
    }

    @ResolveField(() => Department)
    enterprise(@Parent() enterprise: Enterprise) {
        return enterprise.enterprise;
    }

    @ResolveField(() => Enterprise)
    enterprises(@Parent() enterprise: Enterprise) {
        return enterprise.enterprises;
    }
}
