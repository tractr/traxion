import { OpenQuestion, FindUniqueOpenQuestionArgs, FindManyOpenQuestionArgs, CreateOneOpenQuestionArgs, UpdateOneOpenQuestionArgs, DeleteOneOpenQuestionArgs } from "../../generated/prisma-nestjs-graphql";
import { OpenQuestionService, OPEN_QUESTION_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyOpenQuestionOutput } from "./find-many-open-question-output.dto";

@Resolver(() => OpenQuestion)
export class OpenQuestionResolver {
    constructor(@Inject(OPEN_QUESTION_SERVICE) private readonly openQuestionService: OpenQuestionService) {
    }

    /** Query for a unique openQuestion */
    @Query(() => OpenQuestion, { nullable: true })
    async findUniqueOpenQuestion(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueOpenQuestionArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.openQuestionService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple openQuestions. */
    @Query(() => FindManyOpenQuestionOutput)
    async findManyOpenQuestion(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyOpenQuestionArgs) {

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

    /** Create a single openQuestion. */
    @Mutation(() => OpenQuestion, { nullable: true })
    async createOpenQuestion(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneOpenQuestionArgs) {

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

    /** Update a single openQuestion. */
    @Mutation(() => OpenQuestion, { nullable: true })
    async updateOpenQuestion(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneOpenQuestionArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single OpenQuestion. */
    @Mutation(() => OpenQuestion, { nullable: true })
    async deleteOpenQuestion(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneOpenQuestionArgs) {

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
