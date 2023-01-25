import { Role, FindUniqueRoleArgs, FindManyRoleArgs, CreateOneRoleArgs, UpdateOneRoleArgs, DeleteOneRoleArgs } from "../../generated/prisma-nestjs-graphql";
import { RoleService, ROLE_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyRoleOutput } from "./find-many-role-output.dto";

@Resolver(() => Role)
export class RoleResolver {
    constructor(@Inject(ROLE_SERVICE) private readonly roleService: RoleService) {
    }

    /** Query for a unique role */
    @Query(() => Role, { nullable: true })
    async findUniqueRole(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueRoleArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.roleService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple roles. */
    @Query(() => FindManyRoleOutput)
    async findManyRole(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyRoleArgs) {

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

    /** Create a single role. */
    @Mutation(() => Role, { nullable: true })
    async createRole(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneRoleArgs) {

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

    /** Update a single role. */
    @Mutation(() => Role, { nullable: true })
    async updateRole(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneRoleArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single Role. */
    @Mutation(() => Role, { nullable: true })
    async deleteRole(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneRoleArgs) {

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
