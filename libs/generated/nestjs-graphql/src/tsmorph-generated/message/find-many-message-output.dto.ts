import { Message, FindUniqueMessageArgs, FindManyMessageArgs, CreateOneMessageArgs, UpdateOneMessageArgs, DeleteOneMessageArgs } from "../../generated/prisma-nestjs-graphql";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyMessageOutput extends FindManyPagination {
    @Field(() => [Message])
    messages!: Message[];
}
