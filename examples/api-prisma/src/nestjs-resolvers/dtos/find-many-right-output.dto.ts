import { Right, FindUniqueRightArgs, FindManyRightArgs, CreateOneRightArgs, UpdateOneRightArgs, DeleteOneRightArgs } from "../../nestjs-graphql-dtos";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyRightOutput extends FindManyPagination {
    @Field(() => [Right])
    rights!: Right[];
}
