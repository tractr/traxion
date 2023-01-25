import { StringModel, FindUniqueStringModelArgs, FindManyStringModelArgs, CreateOneStringModelArgs, UpdateOneStringModelArgs, DeleteOneStringModelArgs } from "../../generated/prisma-nestjs-graphql";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyStringModelOutput extends FindManyPagination {
    @Field(() => [StringModel])
    stringModels!: StringModel[];
}
