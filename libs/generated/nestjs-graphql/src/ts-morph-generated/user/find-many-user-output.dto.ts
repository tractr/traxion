import { User, FindUniqueUserArgs, FindManyUserArgs, CreateOneUserArgs, UpdateOneUserArgs, DeleteOneUserArgs } from "../../generated/prisma-nestjs-graphql";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyUserOutput extends FindManyPagination {
    @Field(() => [User])
    users!: User[];
}
