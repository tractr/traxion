import { Department, Enterprise, FindUniqueDepartmentArgs, FindManyDepartmentArgs, CreateOneDepartmentArgs, UpdateOneDepartmentArgs, DeleteOneDepartmentArgs } from "../../generated/prisma-nestjs-graphql";
import { DepartmentService, DEPARTMENT_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyDepartmentOutput } from "./find-many-department-output.dto";

@Resolver(() => Department)
export class DepartmentResolver {
    constructor(@Inject(DEPARTMENT_SERVICE) private readonly departmentService: DepartmentService) {
    }

    /** Query for a unique department */
    @Query(() => Department, { nullable: true })
    async findUniqueDepartment(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueDepartmentArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.departmentService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple departments. */
    @Query(() => FindManyDepartmentOutput)
    async findManyDepartment(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyDepartmentArgs) {

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

    /** Create a single department. */
    @Mutation(() => Department, { nullable: true })
    async createDepartment(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneDepartmentArgs) {

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

    /** Update a single department. */
    @Mutation(() => Department, { nullable: true })
    async updateDepartment(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneDepartmentArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single Department. */
    @Mutation(() => Department, { nullable: true })
    async deleteDepartment(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneDepartmentArgs) {

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
    enterprise(@Parent() department: Department) {
        return department.enterprise;
    }
}
