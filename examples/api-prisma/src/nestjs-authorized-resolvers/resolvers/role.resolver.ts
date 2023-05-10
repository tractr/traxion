import { Role, User, Right, FindUniqueRoleArgs, FindManyRoleArgs, CreateOneRoleArgs, UpdateOneRoleArgs, DeleteOneRoleArgs, FindManyUserArgs, FindManyRightArgs } from "../../nestjs-graphql-dtos";
import { RoleService, RoleDefaultService, UserService, RightService } from "../../nestjs-services";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { Prisma } from "@prisma/client";
import { getPathFromGraphQLResolveInfo } from "@trxn/nestjs-graphql";
import { GraphQLResolveInfo } from "graphql";
import { FindManyRoleOutput } from "../dtos";
import { CREATE_ROLE, READ_ROLE, SEARCH_ROLE, UPDATE_ROLE, DELETE_ROLE, UserSelectOwnershipIds as defaultOwnershipSelect } from "../policies";
import { AnyAbility } from "@casl/ability";
import { RoleAuthorizedService, UserAuthorizedService, RightAuthorizedService } from "../../nestjs-authorized-services";
import { CurrentAbilities, Policies } from "@trxn/nestjs-core";

@Resolver(() => Role)
export class RoleResolver {
    constructor(private readonly roleAuthorizedService: RoleAuthorizedService, private readonly roleDefaultService: RoleDefaultService, private readonly roleDefaultService: RoleDefaultService, private readonly userAuthorizedService: UserAuthorizedService, private readonly rightAuthorizedService: RightAuthorizedService) {
    }

    /** Query for a unique role */
    @Query(() => Role, { nullable: true })
    @Policies(READ_ROLE)
    async findUniqueRole(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueRoleArgs, @CurrentAbilities() abilities: AnyAbility) {

            const select = new PrismaSelect(info).value as Prisma.RoleArgs;
            const role =  await this.roleAuthorizedService.findUnique({where, ...select}, abilities);
            return role;
          
    }

    /** Query for multiple roles. */
    @Query(() => FindManyRoleOutput)
    @Policies(SEARCH_ROLE)
    async findManyRoles(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyRoleArgs, @CurrentAbilities() abilities: AnyAbility) {

            const select = new PrismaSelect(info).valueOf('roles', 'Role') as Prisma.RoleArgs;

            const roles = await this.roleAuthorizedService.findMany({
              ...select,
              where,
              cursor,
              distinct,
              orderBy,
              skip,
              take: take + 1,
            }, abilities);

            const count = await this.roleAuthorizedService.count({
              where,
            }, abilities);

            return {
              roles: roles.slice(0, take),
              count,
              hasNextPage: typeof roles[take] !== 'undefined',
            };
          
    }

    /** Create a single role. */
    @Mutation(() => Role, { nullable: true })
    @Policies(CREATE_ROLE)
    async createRole(@Info() info: GraphQLResolveInfo, @Args() { data }: CreateOneRoleArgs, @CurrentAbilities() abilities: AnyAbility) {

            const select = new PrismaSelect(info).value as Prisma.RoleArgs;

            const role = await this.roleAuthorizedService.create({ data, ...select }, abilities);

            return role;
          
    }

    /** Update a single role. */
    @Mutation(() => Role, { nullable: true })
    @Policies(UPDATE_ROLE)
    async updateRole(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneRoleArgs, @CurrentAbilities() abilities: AnyAbility) {

            const select = new PrismaSelect(info).value as Prisma.RoleArgs;

            const role = await this.roleAuthorizedService.update({ where, data, ...select }, abilities);

            return role;
          
    }

    /** Delete a single Role. */
    @Mutation(() => Role, { nullable: true })
    @Policies(DELETE_ROLE)
    async deleteRole(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneRoleArgs, @CurrentAbilities() abilities: AnyAbility) {

            const select = new PrismaSelect(info).value as Prisma.RoleArgs;

            const role = await this.roleAuthorizedService.delete({ where, ...select }, abilities);

            return role;
          
    }

    @ResolveField(() => User)
    async users(@Info() info: GraphQLResolveInfo, @Parent() role: Role, @Args() findManyArgs: FindManyUserArgs, @CurrentAbilities() abilities: AnyAbility) {

          let { users } = role;

          if (typeof users === 'undefined') {
            const select = new PrismaSelect(info, {
              // defaultFields: this.nestjsGraphqlModuleConfig.defaultFields,
            }).valueOf(
              getPathFromGraphQLResolveInfo(info.path),
              'User',
            ) as Prisma.UserArgs;

            const where: Prisma.UserWhereInput = {
              AND: [
                {
                  role: { id: role.id },
                },
                findManyArgs.where || {},
              ],
            };

            users = await this.userAuthorizedService.findMany({
              ...findManyArgs,
              where,
              ...select,
            }, abilities);
          }

          return users;
          
    }

    @ResolveField(() => Right)
    async rights(@Info() info: GraphQLResolveInfo, @Parent() role: Role, @Args() findManyArgs: FindManyRightArgs, @CurrentAbilities() abilities: AnyAbility) {

          let { rights } = role;

          if (typeof rights === 'undefined') {
            const select = new PrismaSelect(info, {
              // defaultFields: this.nestjsGraphqlModuleConfig.defaultFields,
            }).valueOf(
              getPathFromGraphQLResolveInfo(info.path),
              'Right',
            ) as Prisma.RightArgs;

            const where: Prisma.RightWhereInput = {
              AND: [
                {
                  roles: {
                      some: {
                        id: role.id,
                      },
                    },
                },
                findManyArgs.where || {},
              ],
            };

            rights = await this.rightAuthorizedService.findMany({
              ...findManyArgs,
              where,
              ...select,
            }, abilities);
          }

          return rights;
          
    }
}
