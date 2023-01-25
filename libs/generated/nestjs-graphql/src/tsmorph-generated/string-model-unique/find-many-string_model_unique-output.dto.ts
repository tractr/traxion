import { StringModelUnique, FindUniqueStringModelUniqueArgs, FindManyStringModelUniqueArgs, CreateOneStringModelUniqueArgs, UpdateOneStringModelUniqueArgs, DeleteOneStringModelUniqueArgs } from "../../generated/prisma-nestjs-graphql";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyStringModelUniqueOutput extends FindManyPagination {
    @Field(() => [StringModelUnique])
    stringModelUniques!: StringModelUnique[];
}
