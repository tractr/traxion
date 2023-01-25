import { Enterprise, FindUniqueEnterpriseArgs, FindManyEnterpriseArgs, CreateOneEnterpriseArgs, UpdateOneEnterpriseArgs, DeleteOneEnterpriseArgs } from "../../generated/prisma-nestjs-graphql";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyEnterpriseOutput extends FindManyPagination {
    @Field(() => [Enterprise])
    enterprises!: Enterprise[];
}
