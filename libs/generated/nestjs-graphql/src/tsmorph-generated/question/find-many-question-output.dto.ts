import { Question, FindUniqueQuestionArgs, FindManyQuestionArgs, CreateOneQuestionArgs, UpdateOneQuestionArgs, DeleteOneQuestionArgs } from "../../generated/prisma-nestjs-graphql";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyQuestionOutput extends FindManyPagination {
    @Field(() => [Question])
    questions!: Question[];
}
