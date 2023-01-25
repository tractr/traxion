import { Tag, FindUniqueTagArgs, FindManyTagArgs, CreateOneTagArgs, UpdateOneTagArgs, DeleteOneTagArgs } from "../../generated/prisma-nestjs-graphql";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyTagOutput extends FindManyPagination {
    @Field(() => [Tag])
    tags!: Tag[];
}
