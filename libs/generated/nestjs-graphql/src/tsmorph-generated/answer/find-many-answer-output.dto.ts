import { Answer, FindUniqueAnswerArgs, FindManyAnswerArgs, CreateOneAnswerArgs, UpdateOneAnswerArgs, DeleteOneAnswerArgs } from "../../generated/prisma-nestjs-graphql";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyAnswerOutput extends FindManyPagination {
    @Field(() => [Answer])
    answers!: Answer[];
}
