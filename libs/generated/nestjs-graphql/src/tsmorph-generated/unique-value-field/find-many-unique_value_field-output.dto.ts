import { UniqueValueField, FindUniqueUniqueValueFieldArgs, FindManyUniqueValueFieldArgs, CreateOneUniqueValueFieldArgs, UpdateOneUniqueValueFieldArgs, DeleteOneUniqueValueFieldArgs } from "../../generated/prisma-nestjs-graphql";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyUniqueValueFieldOutput extends FindManyPagination {
    @Field(() => [UniqueValueField])
    uniqueValueFields!: UniqueValueField[];
}
