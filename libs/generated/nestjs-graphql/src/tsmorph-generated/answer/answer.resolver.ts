import { Answer, User, Question, Tag, Variable, FindUniqueAnswerArgs, FindManyAnswerArgs, CreateOneAnswerArgs, UpdateOneAnswerArgs, DeleteOneAnswerArgs } from "../../generated/prisma-nestjs-graphql";
import { AnswerService, ANSWER_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyAnswerOutput } from "./find-many-answer-output.dto";

@Resolver(() => Answer)
export class AnswerResolver {
    constructor(@Inject(ANSWER_SERVICE) private readonly answerService: AnswerService) {
    }

    /** Query for a unique answer */
    @Query(() => Answer, { nullable: true })
    async findUniqueAnswer(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueAnswerArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.answerService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple answers. */
    @Query(() => FindManyAnswerOutput)
    async findManyAnswer(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyAnswerArgs) {

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

    /** Create a single answer. */
    @Mutation(() => Answer, { nullable: true })
    async createAnswer(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneAnswerArgs) {

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

    /** Update a single answer. */
    @Mutation(() => Answer, { nullable: true })
    async updateAnswer(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneAnswerArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single Answer. */
    @Mutation(() => Answer, { nullable: true })
    async deleteAnswer(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneAnswerArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.delete(
              { where, ...select },
              prisma.user,
            );

            return user;
          
    }

    @ResolveField(() => Answer)
    owner(@Parent() answer: Answer) {
        return answer.owner;
    }

    @ResolveField(() => Answer)
    question(@Parent() answer: Answer) {
        return answer.question;
    }

    @ResolveField(() => Answer)
    answers(@Parent() answer: Answer) {
        return answer.answers;
    }

    @ResolveField(() => Variable)
    answer(@Parent() answer: Answer) {
        return answer.answer;
    }
}
