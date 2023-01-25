import { Department, FindUniqueDepartmentArgs, FindManyDepartmentArgs, CreateOneDepartmentArgs, UpdateOneDepartmentArgs, DeleteOneDepartmentArgs } from "../../generated/prisma-nestjs-graphql";
import { FindManyPagination } from "@trxn/nestjs-graphql";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FindManyDepartmentOutput extends FindManyPagination {
    @Field(() => [Department])
    departments!: Department[];
}
