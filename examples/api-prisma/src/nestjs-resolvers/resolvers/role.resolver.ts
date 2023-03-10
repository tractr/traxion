import { Role, User, FindUniqueRoleArgs, FindManyRoleArgs, CreateOneRoleArgs, UpdateOneRoleArgs, DeleteOneRoleArgs } from "../../nestjs-graphql-dtos";
import { RoleService, ROLE_SERVICE, RoleDefaultService, ROLE_DEFAULT_SERVICE } from "../../nestjs-services";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyRoleOutput } from "../dtos";

@Resolver(() => Role)
export class RoleResolver {
    constructor(@Inject(ROLE_SERVICE) private readonly roleService: RoleService, @Inject(ROLE_DEFAULT_SERVICE) private readonly roleDefaultService: RoleDefaultService) {
    }

    /** Query for a unique role */
    @Query(() => Role, { nullable: true })
    async findUniqueRole(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueRoleArgs) {

            const select = new PrismaSelect(info).value;
            const role =  await this.roleService.findUnique({where, ...select});
            return role;
          
    }

    /** Query for multiple roles. */
    @Query(() => FindManyRoleOutput)
    async findManyRoles(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyRoleArgs) {

            const select = new PrismaSelect(info).valueOf('roles', 'Role');

            const roles = await this.roleService.findMany({
              ...select,
              where,
              cursor,
              distinct,
              orderBy,
              skip,
              take: take + 1,
            });

            const count = await this.roleService.count({
              where,
            });

            return {
              roles: roles.slice(0, take),
              count,
              hasNextPage: typeof roles[take] !== 'undefined',
            };
          
    }

    /** Create a single role. */
    @Mutation(() => Role, { nullable: true })
    async createRole(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneRoleArgs) {

            const select = new PrismaSelect(info).value;

            const data = {
              ...this.roleDefaultService.getDefaultInternals(),
              ...rawData,
            };

            const role = await this.roleService.create({ data, ...select });

            return role;
          
    }

    /** Update a single role. */
    @Mutation(() => Role, { nullable: true })
    async updateRole(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneRoleArgs) {

            const select = new PrismaSelect(info).value;

            const role = await this.roleService.update({ where, data, ...select });

            return role;
          
    }

    /** Delete a single Role. */
    @Mutation(() => Role, { nullable: true })
    async deleteRole(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneRoleArgs) {

            const select = new PrismaSelect(info).value;

            const role = await this.roleService.delete({ where, ...select });

            return role;
          
    }

    @ResolveField(() => User)
    users(@Parent() role: Role) {
        return role.users;
    }
}
