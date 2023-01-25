import { InternalField, FindUniqueInternalFieldArgs, FindManyInternalFieldArgs, CreateOneInternalFieldArgs, UpdateOneInternalFieldArgs, DeleteOneInternalFieldArgs } from "../../generated/prisma-nestjs-graphql";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyInternalFieldOutput extends FindManyPagination {
    @Field(() => [InternalField])
    internalFields!: InternalField[];
}
