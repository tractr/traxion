import { Variable, FindUniqueVariableArgs, FindManyVariableArgs, CreateOneVariableArgs, UpdateOneVariableArgs, DeleteOneVariableArgs } from "../../generated/prisma-nestjs-graphql";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyVariableOutput extends FindManyPagination {
    @Field(() => [Variable])
    variables!: Variable[];
}
