import { OpenQuestion, FindUniqueOpenQuestionArgs, FindManyOpenQuestionArgs, CreateOneOpenQuestionArgs, UpdateOneOpenQuestionArgs, DeleteOneOpenQuestionArgs } from "../../generated/prisma-nestjs-graphql";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyOpenQuestionOutput extends FindManyPagination {
    @Field(() => [OpenQuestion])
    openQuestions!: OpenQuestion[];
}
