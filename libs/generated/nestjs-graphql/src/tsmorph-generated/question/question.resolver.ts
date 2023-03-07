import { Question, Answer, Message, OpenQuestion, Tag, FindUniqueQuestionArgs, FindManyQuestionArgs, CreateOneQuestionArgs, UpdateOneQuestionArgs, DeleteOneQuestionArgs } from "../../generated/prisma-nestjs-graphql";
import { QuestionService, QUESTION_SERVICE } from "@trxn/generated-nestjs-models-common";
import { Inject } from "@nestjs/common";
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";
import { FindManyQuestionOutput } from "./find-many-question-output.dto";

@Resolver(() => Question)
export class QuestionResolver {
    constructor(@Inject(QUESTION_SERVICE) private readonly questionService: QuestionService) {
    }

    /** Query for a unique question */
    @Query(() => Question, { nullable: true })
    async findUniqueQuestion(@Info() info: GraphQLResolveInfo, @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueQuestionArgs) {

            const select = new PrismaSelect(info).value;
            const user =  await this.questionService.findUnique(where, ...select);
            return user;
          
    }

    /** Query for multiple questions. */
    @Query(() => FindManyQuestionOutput)
    async findManyQuestion(@Info() info: GraphQLResolveInfo, @Args({ nullable: true }) 
                {
                  where,
                  cursor,
                  distinct,
                  orderBy = [{ id: 'asc' }],
                  skip = 0,
                  take = 100,
                }
              : FindManyQuestionArgs) {

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

    /** Create a single question. */
    @Mutation(() => Question, { nullable: true })
    async createQuestion(@Info() info: GraphQLResolveInfo, @Args() { data: rawData }: CreateOneQuestionArgs) {

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

    /** Update a single question. */
    @Mutation(() => Question, { nullable: true })
    async updateQuestion(@Info() info: GraphQLResolveInfo, @Args() { data, where }: UpdateOneQuestionArgs) {

            const select = new PrismaSelect(info, {
              defaultFields: OWNERS_DEFAULT_FIELDS,
            }).value;

            const user = await this.userService.update(
              { where, data, ...select },
              prisma.user,
            );

            return user;
          
    }

    /** Delete a single Question. */
    @Mutation(() => Question, { nullable: true })
    async deleteQuestion(@Info() info: GraphQLResolveInfo, @Args() { where }: DeleteOneQuestionArgs) {

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
    question(@Parent() question: Question) {
        return question.question;
    }

    @ResolveField(() => Message)
    messages(@Parent() question: Question) {
        return question.messages;
    }

    @ResolveField(() => OpenQuestion)
    question(@Parent() question: Question) {
        return question.question;
    }

    @ResolveField(() => Question)
    parentQuestion(@Parent() question: Question) {
        return question.parentQuestion;
    }

    @ResolveField(() => Question)
    questions(@Parent() question: Question) {
        return question.questions;
    }
}
